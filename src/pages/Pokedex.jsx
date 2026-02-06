import { useEffect, useState } from "react";


function Pokedex(){

    const [trainerName, setTrainerName] = useState('');
    useEffect(() => {
        const savedTrainer = localStorage.getItem('trainer_current');

        if (savedTrainer){
            setTrainerName(savedTrainer);
        }
    }, []);

    return(
        <div>
            <h4>Bienvenido {trainerName}</h4>
        </div>
    );
}
export default Pokedex