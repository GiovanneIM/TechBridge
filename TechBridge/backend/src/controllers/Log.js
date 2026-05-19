import LogModel from '../models/Logs.js';


class LogController {
    static async total(req, res) {
        const total = await LogModel.total();

        res.status(200).json({
            total
        })
    }
}

export default LogController;