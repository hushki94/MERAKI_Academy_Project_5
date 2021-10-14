const connection = require("../../db/db");

//create new fundraiser
const createNewFundraiser = (req, res) => {
    const { userId, title, country, typee, targett, img, descriptionn } = req.body;
    const queryString = `INSERT INTO  campaigns (userId, title , country, typee, targett, img, descriptionn) VALUES (?,?,?,?,?,?,?)`;
    const data = [userId, title, country, typee, targett, img, descriptionn];
    connection.query(queryString, data, (err, result) => {
        console.log(data, "dataaaaaaaaa");
        console.log("Erroe", err);
        if (result) {
            res.status(201).json({
                success: true,
                message: ` Success fundraiser created`,
                fundraiser: result,
            });
        }
        if (err) {
            res.status(500).json({
                success: false,
                message: `Server Error`,
                err: err,
            });
        }
    });
};

// Get all fundraiser
const getAllFundraiser = (req, res) => {
    const query = `SELECT * FROM campaigns WHERE is_deleted=1`;
    connection.query(query, (error, result) => {
        if (error) {
            res.status(500).json({
                success: false,
                message: `Server Error`,
                error: error,
            });
        }
        res
            .status(200)
            .json({ success: true, message: `All Fundraiser`, result: result });
    });
};

//update fundraiser by its id
const updateFundRaiserById = (req, res) => {
    const id = req.params.id; // fundraiser id
    const { title, descriptionn, img, country } = req.body;
    const query = `SELECT * FROM campaigns Where id=${id}`;

    connection.query(query, (error, result) => {
        if (result) {
            const data = [title, descriptionn, img, country];
            const query1 = `UPDATE campaigns SET title=? , descriptionn=? , img=?  , country=? WHERE id = ${id}`;
            if (error) {
                res.status(200).json({
                    success: false,
                    message: `Error happened during query for the fundraiser`,
                    error: error,
                });
            }
            connection.query(query1, data, (error, result) => {
                if (result) {
                    res.status(200).json({
                        success: true,
                        message: `Success, updated the Fundraiser => ${id}`,
                        result: result,
                    });
                } else {
                    res.status(404).json({
                        success: false,
                        message: `Fundraiser Not Found => ${id}`,
                    });
                }
                if (error) {
                    res.status(500).json({
                        success: false,
                        message: `Server error`,
                    });
                }
            });
        }
    });
};

//get all fundraiser for specific user ( fundraisers he created )
const getAllFundRaiserByUser = (req, res) => {
    let userid = req.params.userid;
    const query = `SELECT * FROM campaigns WHERE userid = ${userid} AND is_deleted=1`;
    connection.query(query, (error, result) => {
        if (error) {
            res.status(500).json({
                success: false,
                message: `Server Error`,
                error: error,
            });
        }
        res.status(200).json({ success: true, message: "All FundRaiser By User", result: result });
    });
};

//get  fundraiser for specific id for it 
const getFundRaiserById = (req, res) => {
    let id = req.params.id;
    const query = `SELECT * FROM campaigns WHERE userid = ${id} AND is_deleted=1`;
    connection.query(query, (error, result) => {
        if (error) {
            res.status(500).json({
                success: false,
                message: `Server Error`,
                error: error,
            });
        }
        res.status(200).json({ success: true, message: "FundRaiser By Id", result: result });
    });
};

// delete fundraiser for specific user ( hard delete )
const deleteFundraiserByUser = (req, res) => {
    const id = req.params.id;
    const query = `SELECT * FROM campaigns WHERE id = ${id}`;
    connection.query(query, (err, result) => {
        if (err) {
            return res.status(404).json({
                success: false,
                message: `The campaign with id ==> ${id} not found`,
            });
        }
        if (result.length) {
            const query1 = `DELETE FROM campaigns WHERE id = ${id}`;
            connection.query(query1, (err, result) => {
                res.status(200).json({
                    success: true,
                    message: `Success Delete campaign with id => ${id}`,
                    result: result
                });
            });
        } else {
            res.status(404).json({
                success: false,
                message: `The campaign with id ==> ${id} not found`
            })
        }
    });
};

const getAllFundraiserByType = (req, res) => { //need testing
    let type = req.params.type
    const query = `SELECT * FROM campaigns WHERE type = ${type}`;
    connection.query(query, (error, result) => {
        if (error) {
            res.status(500).json({
                success: false,
                message: `Server Error`,
                error: error,
            });
        }
        res.status(200).json({ success: true, message: `All the fund raisers of type: ${type}`, result: result });
    });
}


const getTopFundraiserByCurrentTarget = (req, res) => {

    //   SELECT * FROM campaigns ORDER BY current_target DESC LIMIT 3;

    const query = `SELECT * FROM campaigns ORDER BY current_target DESC LIMIT 3`;
    connection.query(query, (error, result) => {
        if (error) {
            res.status(500).json({
                success: false,
                message: `Server Error`,
                error: error,
            });
        }
        res
            .status(200)
            .json({ success: true, message: `Top three Fundraisers`, result: result });
    });

}

const getThreeRandomFundraisers = (req, res) => {
    const query = `SELECT * FROM campaigns ORDER BY RAND() LIMIT 6`;
    connection.query(query, (error, result) => {
        if (error) {
            res.status(500).json({
                success: false,
                message: `Server Error`,
                error: error,
            });
        }
        res
            .status(200)
            .json({ success: true, message: `Random three Fundraisers`, result: result });
    });

}



module.exports = {
    createNewFundraiser,
    getAllFundraiser,
    updateFundRaiserById,
    getFundRaiserById,
    getAllFundRaiserByUser,
    deleteFundraiserByUser,
    getAllFundraiserByType,
    getTopFundraiserByCurrentTarget,
    getThreeRandomFundraisers
};