import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Importa axios
import './ResultPage.css'; // Para los estilos
import NameLabel from '../components/NameLabel';
const API_URL = process.env.API_URL;
const ResultPage = () => {
    const [seconds, setSeconds] = useState(10);
    const [finished, setFinished] = useState(false);
    const [result, setResult] = useState(null); // Estado para almacenar el resultado
    const [showName, setShowName] = useState(false); // Estado para mostrar el nombre
    const [displayName, setDisplayName] = useState(''); // Estado para el nombre que se mostrará

    useEffect(() => {
        // Iniciar el conteo regresivo
        const interval = setInterval(() => {
            setSeconds((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    setFinished(true);
                    fetchResult(); // Llama a la API cuando el contador termina
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    // Función para obtener el resultado de la API
    const fetchResult = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/gender-reveal/result`); // Cambia la URL según tu configuración
            setResult(response.data.gender); // Almacena el género en el estado
            setTimeout(() => {
                setShowName(true); // Muestra el nombre después de 10 segundos
            }, 5000); // Espera 1 segundo antes de mostrar el nombre
        } catch (error) {
            console.error('Error al obtener el resultado:', error);
            setResult('ERROR'); // Manejo de errores
        }
    };


    let genderClass = '';
    if (!!result) {
        genderClass = `is-${result.toLowerCase()}`;
    }

    return (
        <div className={`countdown-container ${finished ? 'finished' : ''} ${genderClass}`}>
            {!finished ? (
                <h1>{seconds}</h1>
            ) : (
                <>
                    {showName ? (
                        <><h2>Y mi nombre es...</h2>
                            <NameLabel gender={result} /></>
                    ) : (
                        <h1>{result === 'BOY' ? 'SOY UN NIÑO!' : result === 'GIRL' ? 'SOY UNA NIÑA!' : ''}</h1>
                    )}
                </>
            )}
        </div>
    );
};

export default ResultPage;