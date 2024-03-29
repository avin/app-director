import React, { useCallback, useState } from 'react';
import ChooseEntityDialog from './ChooseEntityDialog';

export default () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleOpen = useCallback(() => {
    setIsOpen((v) => !v);
  }, []);

  return (
    <div className="content">
      <ChooseEntityDialog isOpen={isOpen} onClose={() => setIsOpen(false)}>
        content
      </ChooseEntityDialog>
      <button type="button" onClick={handleToggleOpen}>
        toggle
      </button>
    </div>
  );
};
