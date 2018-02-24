class Wallet {
    constructor(address, pool, userId, totalEarned) {
        this.address = address;
        this.pool = pool;
        this.userId = userId;
        this.totalEarned = totalEarned;
    }
}

module.exports = Wallet;