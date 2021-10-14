import app from './app';
import './database';

app.listen(app.get('PORT'), () => {
    console.log(`Server on port ${app.get('PORT')}`)
})

// cd D:\Escritorio\Auth-Basic\