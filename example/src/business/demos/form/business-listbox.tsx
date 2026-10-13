import ownedStyles0 from '../../components/Button.module.css';
import ownedStyles1 from '../../components/DemoLayout.module.css';
import ownedStyles2 from '../../components/Listbox.module.css';
import { componentClasses } from '../../class-names';
import { useId, useState } from 'react';
import { LayoutGroup } from 'motion/react';
import { Check } from 'lucide-react';
import { BusinessDemo } from '../../components/BusinessDemo';
import { Field } from '../../components/Field';
import { SelectionIndicator } from '../../components/SelectionIndicator';
import { useDemoConfig } from '../../../parameters/DemoConfig';

const ownedStyles={...ownedStyles0,...ownedStyles1,...ownedStyles2};
const cn=(names:string)=>componentClasses(ownedStyles,names);
export default function ListboxDemo() {
  const { props: demoProps } = useDemoConfig();
  const id = useId();
  const options = ['待处理', '设计中', '实现中', '待验收', '已完成'];
  const [value, setValue] = useState('待处理');
  return <BusinessDemo title="Listbox · 列表选择" description="持续展示候选项，选中背景弹性移动，方向键选择。">
    <Field label="任务阶段" {...demoProps('t0')}><LayoutGroup id={id}><div data-ui="aw-business-styled-listbox" className={cn("aw-business-styled-listbox")} role="listbox" aria-label="任务阶段" {...demoProps('t1')}>
      {options.map((item, index) => <button className={cn('aw-business-button-feedback')} type="button" key={item} role="option" aria-selected={value === item} tabIndex={value === item ? 0 : -1}
        onClick={() => setValue(item)} onKeyDown={event => {
          if (!['ArrowUp', 'ArrowDown', 'Home', 'End'].includes(event.key)) return;
          event.preventDefault();
          const next = event.key === 'Home' ? 0 : event.key === 'End' ? options.length - 1 : (index + (event.key === 'ArrowDown' ? 1 : -1) + options.length) % options.length;
          setValue(options[next]);
          event.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>('button')[next]?.focus();
        }} {...demoProps('t2')}>{value === item ? <SelectionIndicator identity={`${id}-selected`} /> : null}<span>{item}</span>{value === item ? <Check size={16} aria-hidden="true" /> : null}</button>)}
    </div></LayoutGroup></Field><p data-ui="aw-business-status" className={cn("aw-business-status")} role="status">阶段：{value}</p>
  </BusinessDemo>;
}
