import style from './PageNotFound.module.scss';

export default function NotFound() {
  return (
    <section className={style.bg}>
      <div className={style.container}>💥 404: Page Not Found</div>
    </section>
  );
}
