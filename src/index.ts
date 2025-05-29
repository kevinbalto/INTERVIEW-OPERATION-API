// #region imports
import server from './server';
import colors from 'colors';
// #endregion imports

const port = process.env.PORT || 4000;

server.listen(port, () => {
    console.log(colors.cyan.bold(`Interiew Operation REST API is running in port ${port}`));
});

