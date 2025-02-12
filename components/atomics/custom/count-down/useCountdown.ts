export const useCountdown = (
  initialEndDate: Date,
  options = {
    onEnd: () => {},
  },
) => {
  const endDate = ref<Date>(initialEndDate || new Date());
  const remaining = ref<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    total: number;
  }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    total: 0,
  });

  let timer: NodeJS.Timer | number | undefined = undefined;

  const calculateRemaining = () => {
    const total = new Date(endDate.value).getTime() - Date.now();

    if (total <= 0) {
      // Nếu đã hết thời gian
      remaining.value = {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        total: 0,
      };
      if (timer) {
        clearInterval(timer as number);
        options.onEnd?.();
      }
      return;
    }

    remaining.value = {
      days: Math.floor(total / (1000 * 60 * 60 * 24)),
      hours: Math.floor((total / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((total / 1000 / 60) % 60),
      seconds: Math.floor((total / 1000) % 60),
      total,
    };
  };

  // Hàm để update endTime
  const updateEndTime = (newEndDate: Date) => {
    endDate.value = newEndDate;
    calculateRemaining();
  };

  const startCountdown = () => {
    calculateRemaining();
    timer = setInterval(calculateRemaining, 1000);
  };

  const stopCountdown = () => {
    if (typeof timer === "number") {
      clearInterval(timer);
      timer = undefined;
    }
  };

  onMounted(() => {
    startCountdown();
  });

  onUnmounted(() => {
    stopCountdown();
  });

  return {
    remaining,
    updateEndTime,
    startCountdown,
    stopCountdown,
  };
};
