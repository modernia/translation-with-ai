import { component$ } from '@builder.io/qwik';
import { QwikLogo } from '../icons/qwik';
import styles from './header.module.css';

export default component$(() => {
  return (
    <header class={styles.header}>
      <div class={['container', styles.wrapper]}>
        <div>
          <a href="/" title="qwik" class="flex gap-2 flex-row items-center text-2xl">
            <span>Made with</span> <QwikLogo height={50} width={143} />
          </a>
        </div>
      </div>
    </header>
  );
});