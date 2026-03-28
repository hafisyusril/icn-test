"use client";

import { Modal, Button } from "@/components/ui";
import { IoWarning } from "react-icons/io5";

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  title?: string;
  message?: string;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export const DeleteConfirmationModal: React.FC<
  DeleteConfirmationModalProps
> = ({
  isOpen,
  title = "Hapus Task",
  message = "Apakah Anda yakin ingin menghapus task ini? Tindakan ini tidak dapat dibatalkan.",
  onConfirm,
  onCancel,
  isLoading = false,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onCancel} title={title} size="sm">
      <div className="space-y-4">
        <div className="flex items-center gap-3 text-yellow-600">
          <IoWarning size={24} className="shrink-0" />
          <p className="text-sm">{message}</p>
        </div>

        <div className="flex gap-2 justify-end pt-4">
          <Button variant="secondary" onClick={onCancel} disabled={isLoading}>
            Batal
          </Button>
          <Button
            variant="danger"
            onClick={onConfirm}
            isLoading={isLoading}
            disabled={isLoading}
          >
            Hapus
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteConfirmationModal;
