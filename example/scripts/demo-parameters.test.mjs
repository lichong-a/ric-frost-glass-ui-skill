import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, readFile, rm } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import ts from 'typescript';
import { buildParameters, parseArguments, readCanonicalTemplates } from './build-parameters.mjs';
import { parseDemo, parameterizeDemo, renderUsage, staticValue, staticEnvironment, valueShape, sourceDigest } from './lib/demo-parameters.mjs';

const expression = source => parseDemo(`const result = ${source};`, 'fixture.ts').statements[0].declarationList.declarations[0].initializer;
const prop = (name, type, extras = {}) => ({ name, type, required: false, description: `Actual ${name} contract.`, ...extras });

test('derived data totals retain authored expressions without becoming independent DIY controls', () => {
  const source = `import Component from '../../../.upstream/Foo';
const items = ['a', 'b', 'c'];
export default function Demo(){return <Component total={items.length} speed={1} />;}`;
  const properties = [prop('total', 'number', { required: true }), prop('speed', 'number', { defaultValue: 1 })];
  const { definition, instrumented } = parameterizeDemo({ id: 'foo', name: 'Foo', sourcePath: '.upstream/Foo.tsx', demoPath: 'src/demos/data/foo.tsx', source,
    api: { props: properties, targets: [{ name: 'Component', native: false, props: properties }] },
    annotations: { components: { foo: { 'prop.total': { editable: false } } } },
  });
  assert.equal(definition.fields.some(field => field.name === 'total'), false);
  assert.equal(definition.props.some(property => property.name === 'total'), true);
  assert.match(instrumented, /total=\{items\.length\}/);
  assert.match(renderUsage(definition), /total=\{items\.length\}/);
  assert.equal(definition.fields.some(field => field.name === 'speed'), true);
});

test('pagination capacity binds the same controlled state used by content and pager', () => {
  const source = `import {useState} from 'react';
import Pager from '../../business/components/Pager';
export default function Demo(){const [size,setSize]=useState(3);return <Pager pageSize={size} onChange={setSize} />;}`;
  const props = [prop('pageSize', 'number', { required: true }), prop('onChange', '(value:number)=>void', { required: true })];
  const result = parameterizeDemo({ id: 'foo', name: 'Foo', sourcePath: 'src/business/demos/data/foo.tsx', demoPath: 'src/business/demos/data/foo.tsx', source, api: { props, targets: [{ name: 'Pager', native: false, props }] } });
  const field = result.definition.fields.find(field => field.key === 'state.size');
  assert.ok(field, 'pageSize is a controlled public value');
  assert.deepEqual(field.bindings, [{ target: 't0', name: 'pageSize' }]);
  assert.equal(result.definition.fields.some(field => field.key === 't0.pageSize'), false);
  assert.match(result.instrumented, /useDemoState\('state\.size', 3\)/);
});

test('static data interpreter resolves Vite resources, arrays, maps and constants without executing source', () => {
  const bindings = new Map([
    ['palette', { primary: '#52604e', ink: '#1f2d26' }],
    ['MEDIA', ['@media/scene-1.svg', '@media/scene-2.svg', '@media/scene-3.svg']],
    ['LABELS', ['山雾', '茶庭', '沙洲']],
  ]);
  assert.deepEqual(staticValue(expression('MEDIA.slice(0, 2).map((src, index) => ({src, alt: LABELS[index], color: palette.primary}))'), bindings), { known: true, value: [{ src: '@media/scene-1.svg', alt: '山雾', color: '#52604e' }, { src: '@media/scene-2.svg', alt: '茶庭', color: '#52604e' }] });
  assert.deepEqual(staticValue(expression('Array.from({length: 2}, (_, index) => `${import.meta.env.BASE_URL}media/scene-${index + 1}.svg`)')), { known: true, value: ['@media/scene-1.svg', '@media/scene-2.svg'] });
  for (const code of ['(() => { throw new Error("executed"); })()', 'globalThis.__demoParameterInjected = true', 'process.exit(1)', 'new Function("return 1")()', '({["__proto__"]:{bad:true}})', 'Array.from({length: 1000000}, (_, index) => index)', '({label: <span>React node</span>})']) assert.deepEqual(staticValue(expression(code), bindings), { known: false }, code);
  assert.equal(Object.hasOwn(globalThis, '__demoParameterInjected'), false);
});

test('only real target attributes and controlled values are editable; callbacks and transient state survive', () => {
  const source = `import { useState } from 'react';
import Component from '../../../.upstream/Foo';
import { Button } from '../../business/components/Button';
const options = [{value: 'one', label: '第一项'}, {value: 'two', label: '第二项'}];
export default function FooDemo() {
  const [value, setValue] = useState<'one'|'two'>('one');
  const [count, setCount] = useState(0);
  const [status, setStatus] = useState('ready');
  const [hovered, setHovered] = useState(false);
  return <div style={{height:400}}><Component text="原始文字" options={options} value={value} onChange={setValue} ref={undefined} color="#52604e" /><Button variant="secondary" onClick={() => {setCount(count+1);setStatus('clicked');setHovered(true);}}>执行操作</Button><input value={value} placeholder="请选择" required onChange={event=>setValue(event.target.value as 'one'|'two')} /><p>{count} {status} {String(hovered)}</p></div>;
}`;
  const api = {
    props: [prop('text', 'string'), prop('options', '{value:string;label:string}[]'), prop('value', 'string'), prop('onChange', '(value:string)=>void'), prop('ref', 'Ref<unknown>'), prop('color', 'string'), prop('speed', 'number', { defaultValue: 1, defaultExpression: '1' })],
    inherited: [],
    targets: [
      { name: 'div', native: true, props: [prop('style', 'CSSProperties')] },
      { name: 'Component', componentName: 'Foo', native: false, props: [prop('text', 'string'), prop('options', '{value:string;label:string}[]'), prop('value', 'string'), prop('onChange', '(value:string)=>void'), prop('ref', 'Ref<unknown>'), prop('color', 'string'), prop('speed', 'number', { defaultValue: 1, defaultExpression: '1' })] },
      { name: 'Button', componentName: 'Button', native: false, props: [prop('variant', "'primary'|'secondary'|'danger'", { defaultValue: 'primary' }), prop('onClick', '()=>void')] },
      { name: 'input', native: true, props: [prop('value', 'string'), prop('placeholder', 'string'), prop('required', 'boolean'), prop('onChange', 'ChangeEventHandler')] },
    ],
  };
  const result = parameterizeDemo({ id: 'foo', name: 'Foo', sourcePath: '.upstream/Foo.tsx', demoPath: 'src/demos/text/foo.tsx', source, api });
  const fields = new Map(result.definition.fields.map(field => [field.key, field]));
  assert.deepEqual(result.definition.targets.map(target => target.id), ['t0', 't1', 't2']);
  assert.equal(fields.get('t0.text').defaultValue, '原始文字');
  assert.deepEqual(fields.get('t0.options').defaultValue, [{ value: 'one', label: '第一项' }, { value: 'two', label: '第二项' }]);
  assert.equal(fields.get('t0.speed').defaultValue, 1);
  assert.equal(fields.get('t0.color').control, 'color');
  assert.deepEqual(fields.get('t0.color').bindings, [{ target: 't0', name: 'color' }]);
  assert.equal(fields.get('t1.variant').control, 'select');
  assert.equal(fields.get('t2.required').defaultValue, true);
  assert.deepEqual(fields.get('state.value').options.map(option => option.value), ['one', 'two']);
  assert.deepEqual(fields.get('state.value').bindings, [{ target: 't0', name: 'value' }, { target: 't2', name: 'value' }]);
  assert.equal(fields.has('state.count'), false);
  assert.equal(fields.has('state.status'), false);
  assert.equal(fields.has('state.hovered'), false);
  assert.equal(fields.has('t0.onChange'), false);
  assert.equal(fields.has('t0.ref'), false);
  assert.equal(fields.has('t1.text'), false, 'the Button receives its own API only');
  assert.equal(fields.has('t0.style'), false, 'layout wrappers do not receive fake component Props');
  assert.equal(fields.get('container.height').scope, 'container');
  assert.deepEqual(result.definition.props, api.props, 'complete actual API survives unchanged');
  assert.match(result.instrumented, /useDemoState<'one'\|'two'>\('state\.value', 'one'\)/);
  assert.match(result.instrumented, /onChange=\{setValue\}/);
  assert.match(result.instrumented, /onClick=\{\(\) => \{setCount/);
  assert.match(result.instrumented, /执行操作<\/Button>/);
  const usage = renderUsage(result.definition, { 't0.text': '修改后 "仍安全"', 'state.value': 'two' });
  assert.match(usage, /useState<'one'\|'two'>\("two"\)/);
  assert.match(usage, /text=\{"修改后 \\"仍安全\\""\}/);
  assert.doesNotMatch(usage, /useDemoConfig|useDemoState|demoProps|__AW_/);
  assert.match(usage, /onChange=\{setValue\}/);
  assert.match(usage, /执行操作<\/Button>/);
  assert.equal(parseDemo(usage).parseDiagnostics.length, 0);
  const dollarText='$& $$ $1';
  assert.ok(renderUsage(result.definition,{'t0.text':dollarText}).includes(`text={${JSON.stringify(dollarText)}}`));
});

test('native range boundaries, constructor rebuild fields, JSON shapes and resource usage are real', () => {
  const source = `import {useState} from 'react';
import Component from '../../../.upstream/Foo';
export default function Demo(){const [value,setValue]=useState(35);const [selected,setSelected]=useState<string[]>([]);return <><Component image={"@media/scene-1.svg"} data={[{label:'a',value:1},{label:'b',value:2}]} selected={selected} onSelect={setSelected}/><input type="range" min={0} max={100} step={5} value={value} onChange={event=>setValue(Number(event.target.value))}/></>}`;
  const api = { props: [prop('image', 'string'), prop('data', 'Item[]'), prop('selected', 'string[]')], inherited: [], targets: [
    {name:'Component',native:false,props:[prop('image','string'),prop('data','Item[]'),prop('selected','string[]')]},
    {name:'input',native:true,props:['type','min','max','step','value'].map(name=>prop(name,name==='type'?'string':'number'))},
  ] };
  const { definition } = parameterizeDemo({id:'foo',name:'Foo',sourcePath:'.upstream/Foo.tsx',demoPath:'src/demos/visuals/foo.tsx',source,api,rebuild:true});
  const field = definition.fields.find(item=>item.key==='state.value');
  assert.equal(field.min,0); assert.equal(field.max,100); assert.equal(field.step,5); assert.equal(field.control,'range'); assert.equal(field.apply,'live');
  assert.equal(definition.fields.find(item=>item.key==='t0.image').apply,'rebuild');
  assert.deepEqual(definition.fields.find(item=>item.key==='state.selected').shape,{kind:'array',items:{kind:'string'}});
  assert.deepEqual(valueShape([{id:'a',children:[{id:'child'}]},{id:'b'}]), {kind:'array',items:{kind:'object',properties:{id:{kind:'string'},children:{kind:'array',items:{kind:'object',properties:{id:{kind:'string'}},required:['id']}}},required:['id']}});
  assert.match(renderUsage(definition), /image=\{`\$\{import\.meta\.env\.BASE_URL\}media\/scene-1\.svg`\}/);
});

test('local module constants are read as AST data, and capture/regeneration is idempotent', async () => {
  const root = await mkdtemp(path.join(os.tmpdir(),'aw-parameters-'));
  try {
    for (const directory of ['catalog','src/demos/text','src/shared']) await mkdir(path.join(root,directory),{recursive:true});
    const source = `import Component from '../../../.upstream/fixtures/Foo';\nimport {palette,MEDIA} from '../../shared/support';\nexport default function FooDemo(){return <Component color={palette.primary} images={MEDIA.slice(0,2)} />;}\n`;
    await writeFile(path.join(root,'src/shared/palette.ts'), "export const palette = {primary:'#52604e'} as const;\n");
    await writeFile(path.join(root,'src/shared/support.ts'), "export {palette} from './palette';\nexport const MEDIA=Array.from({length:3},(_,index)=>`${import.meta.env.BASE_URL}media/scene-${index+1}.svg`);\n");
    const component = {id:'foo',name:'Foo',sourceName:'Foo',category:'text',provider:'react-bits',sourceCategory:'text-animations',tags:['react-bits','text-animations']};
    const files = {
      'catalog/use-categories.json':{schemaVersion:1,total:1,categories:[{id:'text',name:'文字'}],components:[component]},
      'catalog/upstream-manifest.json':{components:[{slug:'foo',id:'Foo',files:[{path:'fixtures/Foo.tsx'}],capabilities:{}}]},
      'catalog/business-catalog.json':{components:[]},
      'catalog/parameter-api.json':{components:{foo:{id:'foo',sourcePath:'.upstream/fixtures/Foo.tsx',props:[prop('color','string'),prop('images','string[]')],inherited:[],targets:[{name:'Component',native:false,props:[prop('color','string'),prop('images','string[]')]}]}}},
    };
    for (const [filename, data] of Object.entries(files)) await writeFile(path.join(root,filename),JSON.stringify(data));
    await writeFile(path.join(root,'src/demos/text/foo.tsx'),source);
    const environment=await staticEnvironment(source,'src/demos/text/foo.tsx',root);
    assert.deepEqual(staticValue(expression('palette.primary'),environment),{known:true,value:'#52604e'});
    assert.deepEqual(staticValue(expression('MEDIA.slice(0,2)'),environment),{known:true,value:['@media/scene-1.svg','@media/scene-2.svg']});
    const first = await buildParameters({root,capture:true});
    assert.equal(first.generated,1); assert.equal(first.targets,1);
    const canonical = await readCanonicalTemplates(root);
    assert.equal(canonical.templates.foo.source,source);
    assert.equal(canonical.templates.foo.sha256,sourceDigest(source));
    const generated = await readFile(path.join(root,'src/demos/text/foo.tsx'),'utf8');
    const definition = await readFile(path.join(root,'src/parameters/definitions/foo.json'),'utf8');
    await buildParameters({root,component:'foo'});
    assert.equal(await readFile(path.join(root,'src/demos/text/foo.tsx'),'utf8'),generated);
    assert.equal(await readFile(path.join(root,'src/parameters/definitions/foo.json'),'utf8'),definition);
    await buildParameters({root,check:true});
    await assert.rejects(buildParameters({root,capture:true}),/Refusing to capture instrumented demo/);
    assert.equal((await readCanonicalTemplates(root)).templates.foo.source,source);
    await assert.rejects(buildParameters({root,component:'missing'}),/Unknown component/);
  } finally { await rm(root,{recursive:true,force:true}); }
});

test('CLI rejects ambiguous or missing arguments', () => {
  assert.deepEqual(parseArguments(['--capture','--component','blur-text']),{capture:true,component:'blur-text'});
  assert.deepEqual(parseArguments(['--id','aurora','--check']),{component:'aurora',check:true});
  assert.throws(()=>parseArguments(['--component']),/requires a component id/);
  assert.throws(()=>parseArguments(['--capture-all']),/unknown argument/);
});

test('nullable scalar and array controls keep real branches while React nodes stay authored', () => {
  const source = `import {useState} from 'react';import Component from '../../../.upstream/Foo';export default function Demo(){const [selected,setSelected]=useState<string|null>(null);return <Component selected={selected} onSelect={setSelected} />;}`;
  const properties = [prop('selected','string | null'),prop('gradient','string[] | null',{defaultValue:null,defaultExpression:'null'}),prop('icon','ReactNode',{defaultValue:null,valueKind:'react-node'}),prop('initial','boolean | Target | VariantLabels',{defaultValue:{y:'100%',opacity:0},details:{kind:'union',variants:[{type:'boolean'},{type:'string'},{type:'Target'}]}})];
  const api={apiScope:'component-props',indexSignatures:[],notes:['Actual open aliases remain documented.'],props:properties,inherited:[],targets:[{name:'Component',native:false,props:properties}]};
  const {definition}=parameterizeDemo({id:'foo',name:'Foo',sourcePath:'.upstream/Foo.tsx',demoPath:'src/demos/text/foo.tsx',source,api});
  assert.equal(definition.apiScope,'component-props');
  assert.deepEqual(definition.notes,api.notes);
  assert.equal(definition.fields.some(field=>field.name==='icon'),false);
  assert.deepEqual(definition.fields.find(field=>field.key==='t0.gradient').shape,{kind:'union',variants:[{kind:'array',items:{kind:'string'}},{kind:'null'}]});
  assert.deepEqual(definition.fields.find(field=>field.key==='state.selected').shape,{kind:'union',variants:[{kind:'string'},{kind:'null'}]});
  assert.deepEqual(definition.fields.find(field=>field.key==='t0.initial').shape,{kind:'object',properties:{y:{kind:'string'},opacity:{kind:'number'}},required:['y','opacity']});
  assert.match(renderUsage(definition,{'state.selected':null,'t0.gradient':['#fff','#000']}),/useState<string\|null>\(null\)/);
});

test('one actual image parameter drives both loading probe and effect, with known local resources', async () => {
  const root=await mkdtemp(path.join(os.tmpdir(),'aw-parameter-assets-'));
  try{
    await mkdir(path.join(root,'src/assets/restoration'),{recursive:true});
    await writeFile(path.join(root,'src/assets/restoration/art.svg'),'<svg xmlns="http://www.w3.org/2000/svg"/>');
    const source=`import {useState} from 'react';import Component from '../../../.upstream/Foo';import artwork from '../../assets/restoration/art.svg';export default function Demo(){const [imageState,setImageState]=useState('loading');return <><img src={artwork} alt="" onLoad={()=>setImageState('ready')} onError={()=>setImageState('error')}/>{imageState==='ready'?<Component src={artwork}/>:<p>加载中</p>}</>;}`;
    const environment=await staticEnvironment(source,'src/demos/effects/foo.tsx',root);
    assert.deepEqual(staticValue(expression('artwork'),environment),{known:true,value:'@asset/restoration/art.svg'});
    assert.deepEqual(staticValue(expression("import.meta.env.BASE_URL + 'assets/fonts/demo.css'"),environment),{known:true,value:'@public/assets/fonts/demo.css'});
    const api={props:[prop('src','string')],inherited:[],targets:[{name:'img',native:true,props:[prop('src','string'),prop('alt','string')]},{name:'Component',native:false,props:[prop('src','string')]}]};
    const resources=[{label:'当前图',value:'@asset/restoration/art.svg'},{label:'场景',value:'@media/scene-1.svg'}];
    const {definition,instrumented}=parameterizeDemo({id:'foo',name:'Foo',sourcePath:'.upstream/Foo.tsx',demoPath:'src/demos/effects/foo.tsx',source,api,environment,annotations:{resources}});
    assert.deepEqual(definition.fields.filter(field=>field.name==='src').map(field=>field.key),['t1.src']);
    const field=definition.fields.find(field=>field.key==='t1.src');
    assert.equal(field.apply,'rebuild');
    assert.deepEqual(field.resources,['@asset/restoration/art.svg']);
    assert.deepEqual(field.options,resources);
    assert.match(instrumented,/src=\{String\(demoProps\('t1'\)\.src \?\? artwork\)\}/);
    assert.equal(definition.fields.some(field=>field.key==='state.imageState'),false);
    const usage=renderUsage(definition,{'t1.src':'@media/scene-1.svg'});
    assert.equal((usage.match(/src=\{`\$\{import\.meta\.env\.BASE_URL\}media\/scene-1\.svg`\}/g)??[]).length,2);
    assert.doesNotMatch(usage,/import artwork|__AW_VALUE_/);
    assert.match(usage,/onError=\{\(\)=>setImageState\('error'\)\}/);
    assert.equal(parseDemo(usage).parseDiagnostics.length,0);
    const escaped=renderUsage(definition,{'t1.src':'@media/scene`-${globalThis.injected}.svg'});
    const parsed=parseDemo(escaped);
    assert.equal(parsed.parseDiagnostics.length,0);
    const sourceAttributes=[];
    function visit(node){
      if (ts.isJsxAttribute(node) && node.name.text==='src') sourceAttributes.push(node);
      ts.forEachChild(node,visit);
    }
    visit(parsed);
    for(const attribute of sourceAttributes){
      const template=attribute.initializer.expression;
      assert.equal(template.templateSpans.length,1,'the only interpolation is the trusted deployment base');
      assert.equal(template.templateSpans[0].literal.text,'media/scene`-${globalThis.injected}.svg');
    }
    assert.equal(sourceAttributes.length,2);
  }finally{await rm(root,{recursive:true,force:true});}
});
