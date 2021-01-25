import Grid from "@material-ui/core/Grid";
const Prueba = () => {
    return (
        <div style={{ display: "flex" }}>
            <Grid container spacing={1} style={{ flexGrow: 2 }}>
                <Grid
                    item
                    xs={12}
                    sm={12}
                    md={4}
                    lg={3}
                    style={{ background: "black" }}
                ></Grid>
                <Grid
                    item
                    xs={12}
                    sm={12}
                    md={8}
                    lg={9}
                    style={{ background: "blue" }}
                ></Grid>
            </Grid>
            <div
                style={{
                    position: "fixed",
                    bottom: 0,
                    height: 100,
                    width: "100%",
                    backgroundColor: "red",
                }}
            ></div>
        </div>
    );
};

export default Prueba;
