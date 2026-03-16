import Link from 'next/link';
import styles from './cancel.module.css';

export default function PaymentCancelled() {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.iconWrapper}>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className={styles.icon} 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        
        <h1 className={styles.title}>Pago cancelado</h1>
        
        <p className={styles.description}>
          No te preocupes, no se ha realizado ningún cargo en tu tarjeta. 
          Tu proceso de inscripción para <strong>Activate Brisbane</strong> se ha pausado de forma segura.
        </p>

        <div className={styles.actions}>
          <Link href="/activate-brisbane" className={styles.primaryButton}>
            Volver a intentarlo
          </Link>
          <Link href="/" className={styles.secondaryButton}>
            Ir a la página principal
          </Link>
        </div>

        <p className={styles.helpText}>
          ¿Tienes algún problema con el pago? Escríbenos a <br/>
          <a href="mailto:tickets@irelaaquaandfitness.com">tickets@irelaaquaandfitness.com</a>
        </p>
      </div>
    </div>
  );
}