export function capitalizeFirstLetter(string: string) {
    const words = string.split(' ');
    const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
    return capitalizedWords.join(' ');
}

export function convertToFourDigits(number: number) {
    return number.toString().padStart(4, '0');
}

export function typeColor(type: any){
    switch(type){
        case 'grass': return '#00FF00';
        case 'fire': return 'red';
        case 'water': return 'blue';
        case 'electric': return 'yellow';
        case 'poison': return 'purple';
        case 'ground': return 'brown';
        case 'flying': return 'orange';
        case 'psychic': return 'pink';
        case 'bug': return 'green';
        case 'rock': return 'brown';
        case 'ghost': return 'purple';
        case 'ice': return 'blue';
        case 'dragon': return 'purple';
        case 'dark': return 'black';
        case 'fairy': return 'pink';
        default: return 'black';
    }
}