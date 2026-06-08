import { useEffect, useRef, useState } from 'react';

import FormCard from '../components/FormCard/FormCard';
import Modal from '../components/Modal/Modal';
import HookForm from '../components/forms/HookForm';
import UncontrolledForm from '../components/forms/UncontrolledForm';
import { useAppSelector } from '../store/hooks';

import styles from './MainPage.module.css';

type ModalType = 'uncontrolled' | 'hookform' | null;

const MainPage = () => {
  const submissions = useAppSelector((state) => state.submissions.items);

  const [openModal, setOpenModal] = useState<ModalType>(null);
  const [newId, setNewId] = useState<string | null>(null);

  const prevFirstIdRef = useRef<string | null>(null);

  useEffect(() => {
    if (submissions.length === 0) {
      return;
    }

    const firstId = submissions[0].id;

    if (firstId !== prevFirstIdRef.current) {
      prevFirstIdRef.current = firstId;
      setNewId(firstId);

      const timer = setTimeout(() => setNewId(null), 3000);

      return () => clearTimeout(timer);
    }
  }, [submissions]);

  return (
    <main className={styles.page}>
      <h1>Form Submissions</h1>

      <div className={styles.buttons}>
        <button onClick={() => setOpenModal('uncontrolled')}>Open Uncontrolled Form</button>
        <button onClick={() => setOpenModal('hookform')}>Open React Hook Form</button>
      </div>

      <Modal isOpen={openModal !== null} onClose={() => setOpenModal(null)}>
        {openModal === 'uncontrolled' && <UncontrolledForm onClose={() => setOpenModal(null)} />}
        {openModal === 'hookform' && <HookForm onClose={() => setOpenModal(null)} />}
      </Modal>

      {submissions.length === 0 ? (
        <p>No submissions yet.</p>
      ) : (
        <div>
          {submissions.map((s) => (
            <FormCard key={s.id} submission={s} isNew={s.id === newId} />
          ))}
        </div>
      )}
    </main>
  );
};

export default MainPage;
