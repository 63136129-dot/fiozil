const btn = document.querySelector('#btnTema');

// Variable de control de temas:
// 0 = Claro | 1 = Oscuro | 2 = Rosado
let modo = 0;

btn.addEventListener('click', () => {
    switch (modo) {
        case 0:
            // --- CAMBIAR A MODO OSCURO ---
            document.body.style.backgroundColor = '#121212';
            document.body.style.color = 'white';
            btn.textContent = 'Cambiar a Rosado';
            modo = 1;
            break;

        case 1:
            // --- CAMBIAR A MODO ROSADO ---
            document.body.style.backgroundColor = '#ffb6c1'; // Rosa claro
            document.body.style.color = '#333333';
            btn.textContent = 'Cambiar a Claro';
            modo = 2;
            break;

        case 2:
            // --- CAMBIAR A MODO CLARO ---
            document.body.style.backgroundColor = 'white';
            document.body.style.color = 'black';
            btn.textContent = 'Cambiar a Oscuro';
            modo = 0;
            break;

        default:
            modo = 0;
            break;
    }
});