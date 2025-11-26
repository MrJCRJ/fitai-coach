"use client";

import { useState, useCallback } from "react";
import { PaymentModal } from "@/components/PaymentModal";

interface UseAdManagerOptions {
  onSuccess: () => void;
}

export function useAdManager({ onSuccess }: UseAdManagerOptions) {
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const requestAdOrPayment = useCallback(() => {
    setShowPaymentModal(true);
  }, []);

  const handlePaymentSuccess = useCallback(() => {
    setShowPaymentModal(false);
    onSuccess();
  }, [onSuccess]);

  const handleAdSuccess = useCallback(() => {
    setShowPaymentModal(false);
    onSuccess();
  }, [onSuccess]);

  const PaymentModalComponent = () => (
    <PaymentModal
      isOpen={showPaymentModal}
      onClose={() => setShowPaymentModal(false)}
      onPaymentSuccess={handlePaymentSuccess}
      onAdSuccess={handleAdSuccess}
    />
  );

  return {
    requestAdOrPayment,
    PaymentModalComponent,
  };
}
