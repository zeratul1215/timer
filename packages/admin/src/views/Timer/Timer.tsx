import { useRef, useState, useEffect } from 'react';
import styles from './timer.module.css';
import cls from 'clsx';
import { Button } from '@linktivity/link-ui';

const TOTAL_SECONDS = 5 * 60; // 5分钟

function pad(num: number, len: number) {
  return num.toString().padStart(len, '0');
}

const Timer = () => {
  const [seconds, setSeconds] = useState(TOTAL_SECONDS);
  const [isRunning, setIsRunning] = useState(false);
  const [editingTime, setEditingTime] = useState(false);
  // inputValue 始终为6位数字字符串
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // 计时逻辑
  useEffect(() => {
    if (isRunning && seconds > 0) {
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    } else if (!isRunning && intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  // 时间格式化
  const formatTime = (s: number) => {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    return `${pad(h, 2)}:${pad(m, 2)}:${pad(sec, 2)}`;
  };

  // 解析 hhmmss 字符串为秒
  const parseTime = (str: string) => {
    if (!/^\d{6}$/.test(str)) return null;
    const h = parseInt(str.slice(0, 2), 10);
    const m = parseInt(str.slice(2, 4), 10);
    const s = parseInt(str.slice(4, 6), 10);
    if (m >= 60 || s >= 60) return null;
    return h * 3600 + m * 60 + s;
  };

  // 圆环动画参数
  const radius = 180;
  const circumference = 2 * Math.PI * radius;
  const progress = seconds / TOTAL_SECONDS;
  const offset = circumference * (1 - progress);

  // 按钮事件
  const handleStart = () => setIsRunning(true);
  const handlePause = () => setIsRunning(false);
  const handleReset = () => {
    setIsRunning(false);
    setSeconds(TOTAL_SECONDS);
  };
  const handleAdd = (addSec: number) => setSeconds((prev) => Math.min(prev + addSec, TOTAL_SECONDS));

  // 编辑时间相关
  const handleTimeClick = () => {
    if (!isRunning) {
      // 转成6位数字字符串
      const h = Math.floor(seconds / 3600);
      const m = Math.floor((seconds % 3600) / 60);
      const s = seconds % 60;
      setInputValue(`${pad(h, 2)}${pad(m, 2)}${pad(s, 2)}`);
      setEditingTime(true);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    }
  };
  const handleInputBlur = () => {
    const parsed = parseTime(inputValue);
    if (parsed !== null && parsed > 0 && parsed <= 99 * 3600 + 59 * 60 + 59) {
      setSeconds(parsed);
    }
    setEditingTime(false);
  };
  const handleInputChange = () => {
    // 禁止直接编辑
    return;
  };
  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key >= '0' && e.key <= '9') {
      // 输入数字，左移一位，末尾加新数字
      setInputValue((prev) => {
        const newVal = prev.slice(1) + e.key;
        return newVal;
      });
      e.preventDefault();
    } else if (e.key === 'Backspace') {
      // 退格，右移一位，前面补0
      setInputValue((prev) => {
        const newVal = '0' + prev.slice(0, 5);
        return newVal;
      });
      e.preventDefault();
    } else if (e.key === 'Enter') {
      inputRef.current?.blur();
    } else {
      e.preventDefault();
    }
  };

  // 渲染inputValue为hh:mm:ss
  const renderInputValue = (val: string) =>
    val.replace(/(\d{2})(\d{2})(\d{2})/, '$1:$2:$3');

  return (
    <div className={cls(
      styles.wholeContainer,
      isRunning ? styles.wholeContainerRunning : styles.wholeContainerIdle
    )}>
      <div className={styles.topBar}>
        <span className={styles.tabActive}>タイマー</span>
        <span className={styles.tab}>ストップウォッチ</span>
      </div>
      <div className={styles.timerContainer}>
        <svg width={400} height={400} className={styles.circleSvg}>
          {/* 背景 */}
          <circle
            cx={200}
            cy={200}
            r={radius}
            fill="none"
            stroke={isRunning ? "#0d47a1" : "#8d6e63"}
            strokeWidth={10}
          />
          {/* 进度条 */}
          <circle
            cx={200}
            cy={200}
            r={radius}
            fill="none"
            stroke={isRunning ? "#90caf9" : "#ffe082"}
            strokeWidth={10}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{
              transform: 'rotate(-90deg)',
              transformOrigin: '50% 50%',
              transition: 'stroke-dashoffset 1s linear',
            }}
          />
        </svg>
        <div className={styles.centerContent}>
          {isRunning ? (
            <div className={styles.timeText}>{formatTime(seconds)}</div>
          ) : (
            <div className={styles.timeText} onClick={handleTimeClick} tabIndex={0} style={{cursor: 'pointer'}}>
              {editingTime ? (
                <input
                  ref={inputRef}
                  className={styles.timeInput}
                  value={renderInputValue(inputValue)}
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                  onKeyDown={handleInputKeyDown}
                  maxLength={8}
                  style={{
                    fontSize: 'inherit',
                    fontWeight: 'inherit',
                    color: 'inherit',
                    textAlign: 'center',
                    background: 'none',
                    border: 'none',
                    outline: 'none',
                    width: '10ch',
                  }}
                />
              ) : (
                formatTime(seconds)
              )}
            </div>
          )}
          {!isRunning && (
            <div className={styles.addBtns}>
              <Button className={styles.addBtn} 
                onClick={() => handleAdd(30)}
              >+0:30</Button>
              <Button className={styles.addBtn} 
                onClick={() => handleAdd(60)}
              >+1:00</Button>
            </div>
          )}
        </div>
      </div>
      <div className={styles.bottomBar}>
        <Button className={styles.startBtn} onClick={isRunning ? handlePause : handleStart}>
          {isRunning ? '⏸' : '▶️'}
        </Button>
        <Button className={styles.resetBtn} onClick={handleReset}>
          🔄
        </Button>
      </div>
    </div>
  );
};

export default Timer;