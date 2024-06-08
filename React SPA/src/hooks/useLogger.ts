import { useContext } from 'react';
import { LoggerContext } from '../context/LoggerContext';

export const useLogger = () => {
    const logger = useContext(LoggerContext);
    return logger;
};
