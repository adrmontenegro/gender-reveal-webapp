import { useEffect, useState } from "react";

const NameLabel = ({gender}) => {
    const name = gender === "BOY" ? 'MATEO' : 'AINOAH';

    const [displayName, setDisplayName] = useState('');
    const [isRealNameVisible, setIsRealNameVisible] = useState(false);

    useEffect(() => {
        // Efecto de letras aleatorias
        const randomLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'; // Letras aleatorias
        const interval = setInterval(() => {
            const randomName = Array.from({ length: name.length }, () => 
                randomLetters.charAt(Math.floor(Math.random() * randomLetters.length))
            ).join('');
            setDisplayName(randomName);
        }, 200); // Cambia la letra cada 200 ms

        // Después de 5 segundos, muestra el nombre real
        const timeout = setTimeout(() => {
            clearInterval(interval);
            setDisplayName(name); // Muestra el nombre real
            setIsRealNameVisible(true); // Indica que el nombre real es visible
        }, 5000); // 5 segundos

        return () => {
            clearInterval(interval);
            clearTimeout(timeout);
        };
    }, [name]);

    return (
        <div>
            <h1>{isRealNameVisible ? displayName : displayName}</h1>
        </div>
    );
};

export default NameLabel;