import s from './ContainerWrapper.module.css';

export default function ContainerWrapper({ children }) {
  return <div className={s.wrap}>{children}</div>;
}
