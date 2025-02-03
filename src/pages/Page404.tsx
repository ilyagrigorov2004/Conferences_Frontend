const Page404 = () => {
    return(
        <div style={{display: "flex",justifyContent: "center", marginTop: "90px"}}>
        <div style={{display: "flex", flexDirection: "column", textAlign: "center", color: "#34375d"}}>
        <h1>Страницы не существует.</h1>
        <button className='my-btn'onClick={() => window.location.href = '/'} style={{ marginTop: '20px', padding: '10px 20px', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
            На главную
        </button>
        </div>
        </div>
    );
}

export default Page404;