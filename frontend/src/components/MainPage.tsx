import React, { CSSProperties } from 'react';

const MainPage = () => {
    const backgroundImage = `${process.env.PUBLIC_URL}/imagee.png`;

    const styles: Record<string, CSSProperties> = {  // Keep this type
        container: {
            width: '100vw',
            height: '100vh',
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
        },
        title: {
            fontSize: '2em',
            color: 'white',
            marginBottom: '20px',
            textAlign: 'center'
        },
        button: {
            padding: '10px 20px'
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.title}>Find Roommate</div>
        </div>
    );
};

export default MainPage;


