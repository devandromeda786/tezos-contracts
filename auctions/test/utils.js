const {
    getValueFromBigMap,
    getAccount,
    getEndpoint,
    packTyped
} = require('@completium/completium-cli');

exports.XTZ = 'XTZ';
exports.FA_1_2 = 'FA_1_2';
exports.FA_2_NFT = 'FA_2_NFT';
exports.FA_2_FT = 'FA_2_FT';

exports.mkBuyAsset = (assetType, assetContract, assetId) => {
    let payload = {};
    switch (assetType) {
        case this.XTZ:
            payload = this.mkXTZAsset();
            break;
        case this.FA_1_2:
            payload = this.mkFA12Asset(assetContract);
            break;
        case this.FA_2_NFT:
            payload = this.mkAuctionNonFungibleFA2Asset(assetContract, assetId);
            break;
        case this.FA_2_FT:
            payload = this.mkFungibleFA2Asset(assetContract, assetId);
            break;
    }
    return payload;
};

exports.mkFungibleFA2Asset = (assetContract, assetId) => {
    return packTyped({
        prim: "Pair",
        args: [
            {
                string: `${assetContract}`,
            },
            {
                int: `${assetId}`,
            },
        ],
    }, {
        prim: "pair",
        args: [
            {
                prim: "address",
            },
            {
                prim: "nat",
            },
        ],
    });
};


exports.mkAuctionNonFungibleFA2Asset = (assetContract, assetId) => {
    return {
        "prim": "Pair",
        "args": [{
            "prim": "Right",
            "args": [{
                "prim": "Right",
                "args": [{
                    "prim": "Left",
                    "args": [{
                        "int": "1"
                    }]
                }]
            }]
        }, {
            "prim": "Pair",
            "args": [
                {
                    "args": [
                        {
                            "string": assetContract
                        }
                    ],
                    "prim": "Some"
                }, {
                    "prim": "Some",
                    "args": [{
                        "int": `${assetId}`
                    }]
                }]
        }]
    };
};

exports.mkAuctionNonFungibleFA2AssetWithMissingAssetid = (assetContract) => {
    return packTyped(
        {
            string: `${assetContract}`,
        },
        {
            prim: "address",
        }
    );
};

exports.mkAuctionNonFungibleFA2AssetWithMissingContract = (assetId) => {
    return packTyped({
        int: `${assetId}`,
    }, {
        prim: "nat",
    });
};

exports.mkAuctionNonFungibleFA2AssetWithMissingContractAndId = () => {
    return packTyped({
        int: "",
    }, {
        prim: "nat",
    });
};

exports.mkFA12Asset = (assetContract) => {
    return packTyped({
        string: `${assetContract}`,
    }, {
        prim: "address",
    });
};

exports.mkXTZAsset = () => {
    return 0x00;
};

exports.mkStartDate = (startDate) => {
    if (startDate) {
        return {
            "prim": "Some",
            "args": [
                {
                    "int": `${startDate}`
                }
            ]
        };
    } else {
        return { "prim": "None" };
    }
};

exports.mkPart = (address, value) => {
    return {
        "prim": "Pair",
        "args": [
            {
                "string": address
            },
            {
                "int": `${value}`
            }
        ]
    };
};

exports.mkAuction = (
    sellAssetContract,
    sellAssetId,
    buyAsset,
    buyAssetType,
    assetQty,
    seller,
    startDate,
    auctionDuration,
    minPrice,
    buyOutPrice,
    minStep,
    payouts,
    originFees,
    dataType,
    data
) => {
    return {
        "prim": "Pair",
        "args": [
            {
                "string": `${sellAssetContract}`
            },
            {
                "prim": "Pair",
                "args": [
                    {
                        "int": `${sellAssetId}`
                    },
                    {
                        "prim": "Pair",
                        "args": [
                            {
                                "int": `${assetQty}`
                            },
                            {
                                "prim": "Pair",
                                "args": [
                                    {
                                        "int": `${buyAssetType}`
                                    },
                                    {
                                        "prim": "Pair",
                                        "args": [
                                            {
                                                "bytes": `${buyAsset}`
                                            },
                                            {
                                                "prim": "Pair",
                                                "args": [
                                                    {
                                                        "string": `${seller}`
                                                    },
                                                    {
                                                        "prim": "Pair",
                                                        "args": [
                                                            this.mkStartDate(startDate),
                                                            {
                                                                "prim": "Pair",
                                                                "args": [
                                                                    {
                                                                        "int": `${auctionDuration}`
                                                                    },
                                                                    {
                                                                        "prim": "Pair",
                                                                        "args": [
                                                                            {
                                                                                "int": `${minPrice}`
                                                                            },
                                                                            {
                                                                                "prim": "Pair",
                                                                                "args": [
                                                                                    {
                                                                                        "int": `${buyOutPrice}`
                                                                                    },
                                                                                    {
                                                                                        "prim": "Pair",
                                                                                        "args": [
                                                                                            {
                                                                                                "int": `${minStep}`
                                                                                            },
                                                                                            {
                                                                                                "prim": "Pair",
                                                                                                "args": [
                                                                                                    payouts,
                                                                                                    {
                                                                                                        "prim": "Pair",
                                                                                                        "args": [
                                                                                                            originFees,
                                                                                                            {
                                                                                                                "prim": "Pair",
                                                                                                                "args": [
                                                                                                                    {
                                                                                                                        "prim": "None"
                                                                                                                    },
                                                                                                                    {
                                                                                                                        "prim": "None"
                                                                                                                    }
                                                                                                                ]
                                                                                                            }
                                                                                                        ]
                                                                                                    }
                                                                                                ]
                                                                                            }
                                                                                        ]
                                                                                    }
                                                                                ]
                                                                            }
                                                                        ]
                                                                    }
                                                                ]
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    };
};

exports.mkAuctionWithMissingFA2AssetContract = (
    sellAssetId,
    buyAssetContract,
    buyAssetId,
    buyAssetType,
    assetQty,
    seller,
    startDate,
    auctionDuration,
    minPrice,
    buyOutPrice,
    minStep,
    payouts,
    originFees,
    dataType,
    data
) => {
    return {
        "prim": "Pair",
        "args": [
            this.mkAuctionNonFungibleFA2AssetWithMissingContract(sellAssetId),
            {
                "prim": "Pair",
                "args": [
                    {
                        "int": `${assetQty}`,
                    },
                    {
                        "prim": "Pair",
                        "args": [
                            this.mkBuyAsset(buyAssetType, buyAssetContract, buyAssetId),
                            {
                                "prim": "Pair",
                                "args": [
                                    {
                                        "string": `${seller}`
                                    },
                                    {
                                        "prim": "Pair",
                                        "args": [
                                            this.mkStartDate(startDate),
                                            {
                                                "prim": "Pair",
                                                "args": [
                                                    {
                                                        "int": `${auctionDuration}`
                                                    },
                                                    {
                                                        "prim": "Pair",
                                                        "args": [
                                                            {
                                                                "int": `${minPrice}`
                                                            },
                                                            {
                                                                "prim": "Pair",
                                                                "args": [
                                                                    {
                                                                        "int": `${buyOutPrice}`
                                                                    },
                                                                    {
                                                                        "prim": "Pair",
                                                                        "args": [
                                                                            {
                                                                                "int": `${minStep}`
                                                                            },
                                                                            {
                                                                                "prim": "Pair",
                                                                                "args": [
                                                                                    payouts,
                                                                                    {
                                                                                        "prim": "Pair",
                                                                                        "args": [
                                                                                            originFees,
                                                                                            {
                                                                                                "prim": "Pair",
                                                                                                "args": [{
                                                                                                    "prim": "None"
                                                                                                },
                                                                                                {
                                                                                                    "prim": "None"
                                                                                                }
                                                                                                ]
                                                                                            }
                                                                                        ]
                                                                                    }
                                                                                ]
                                                                            }
                                                                        ]
                                                                    }
                                                                ]
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    };
};

exports.mkAuctionWithMissingFA2AssetId = (
    sellAssetContract,
    buyAssetContract,
    buyAssetId,
    buyAssetType,
    assetQty,
    seller,
    startDate,
    auctionDuration,
    minPrice,
    buyOutPrice,
    minStep,
    payouts,
    originFees,
    dataType,
    data
) => {
    return {
        "prim": "Pair",
        "args": [
            this.mkAuctionNonFungibleFA2AssetWithMissingAssetid(sellAssetContract),
            {
                "prim": "Pair",
                "args": [
                    {
                        "int": `${assetQty}`,
                    },
                    {
                        "prim": "Pair",
                        "args": [
                            this.mkBuyAsset(buyAssetType, buyAssetContract, buyAssetId),
                            {
                                "prim": "Pair",
                                "args": [
                                    {
                                        "string": `${seller}`
                                    },
                                    {
                                        "prim": "Pair",
                                        "args": [
                                            this.mkStartDate(startDate),
                                            {
                                                "prim": "Pair",
                                                "args": [
                                                    {
                                                        "int": `${auctionDuration}`
                                                    },
                                                    {
                                                        "prim": "Pair",
                                                        "args": [
                                                            {
                                                                "int": `${minPrice}`
                                                            },
                                                            {
                                                                "prim": "Pair",
                                                                "args": [
                                                                    {
                                                                        "int": `${buyOutPrice}`
                                                                    },
                                                                    {
                                                                        "prim": "Pair",
                                                                        "args": [
                                                                            {
                                                                                "int": `${minStep}`
                                                                            },
                                                                            {
                                                                                "prim": "Pair",
                                                                                "args": [
                                                                                    payouts,
                                                                                    {
                                                                                        "prim": "Pair",
                                                                                        "args": [
                                                                                            originFees,
                                                                                            {
                                                                                                "prim": "Pair",
                                                                                                "args": [{
                                                                                                    "prim": "None"
                                                                                                },
                                                                                                {
                                                                                                    "prim": "None"
                                                                                                }
                                                                                                ]
                                                                                            }
                                                                                        ]
                                                                                    }
                                                                                ]
                                                                            }
                                                                        ]
                                                                    }
                                                                ]
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    };
};

exports.mkAuctionWithMissingFA2AssetContractAndId = (
    buyAssetContract,
    buyAssetId,
    buyAssetType,
    assetQty,
    seller,
    startDate,
    auctionDuration,
    minPrice,
    buyOutPrice,
    minStep,
    payouts,
    originFees,
    dataType,
    data
) => {
    return {
        "prim": "Pair",
        "args": [
            this.mkAuctionNonFungibleFA2AssetWithMissingContractAndId(),
            {
                "prim": "Pair",
                "args": [
                    {
                        "int": `${assetQty}`,
                    },
                    {
                        "prim": "Pair",
                        "args": [
                            this.mkBuyAsset(buyAssetType, buyAssetContract, buyAssetId),
                            {
                                "prim": "Pair",
                                "args": [
                                    {
                                        "string": `${seller}`
                                    },
                                    {
                                        "prim": "Pair",
                                        "args": [
                                            this.mkStartDate(startDate),
                                            {
                                                "prim": "Pair",
                                                "args": [
                                                    {
                                                        "int": `${auctionDuration}`
                                                    },
                                                    {
                                                        "prim": "Pair",
                                                        "args": [
                                                            {
                                                                "int": `${minPrice}`
                                                            },
                                                            {
                                                                "prim": "Pair",
                                                                "args": [
                                                                    {
                                                                        "int": `${buyOutPrice}`
                                                                    },
                                                                    {
                                                                        "prim": "Pair",
                                                                        "args": [
                                                                            {
                                                                                "int": `${minStep}`
                                                                            },
                                                                            {
                                                                                "prim": "Pair",
                                                                                "args": [
                                                                                    payouts,
                                                                                    {
                                                                                        "prim": "Pair",
                                                                                        "args": [
                                                                                            originFees,
                                                                                            {
                                                                                                "prim": "Pair",
                                                                                                "args": [{
                                                                                                    "prim": "None"
                                                                                                },
                                                                                                {
                                                                                                    "prim": "None"
                                                                                                }
                                                                                                ]
                                                                                            }
                                                                                        ]
                                                                                    }
                                                                                ]
                                                                            }
                                                                        ]
                                                                    }
                                                                ]
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    };
};

exports.mkFungibleFA2Auction = (
    sellAssetContract,
    sellAssetId,
    buyAssetContract,
    buyAssetId,
    buyAssetType,
    assetQty,
    seller,
    startDate,
    auctionDuration,
    minPrice,
    buyOutPrice,
    minStep,
    payouts,
    originFees,
    dataType,
    data
) => {
    return {
        "prim": "Pair",
        "args": [
            this.mkFungibleFA2Asset(sellAssetContract, sellAssetId),
            {
                "prim": "Pair",
                "args": [
                    {
                        "int": `${assetQty}`,
                    },
                    {
                        "prim": "Pair",
                        "args": [
                            this.mkBuyAsset(buyAssetType, buyAssetContract, buyAssetId),
                            {
                                "prim": "Pair",
                                "args": [
                                    {
                                        "string": `${seller}`
                                    },
                                    {
                                        "prim": "Pair",
                                        "args": [
                                            this.mkStartDate(startDate),
                                            {
                                                "prim": "Pair",
                                                "args": [
                                                    {
                                                        "int": `${auctionDuration}`
                                                    },
                                                    {
                                                        "prim": "Pair",
                                                        "args": [
                                                            {
                                                                "int": `${minPrice}`
                                                            },
                                                            {
                                                                "prim": "Pair",
                                                                "args": [
                                                                    {
                                                                        "int": `${buyOutPrice}`
                                                                    },
                                                                    {
                                                                        "prim": "Pair",
                                                                        "args": [
                                                                            {
                                                                                "int": `${minStep}`
                                                                            },
                                                                            {
                                                                                "prim": "Pair",
                                                                                "args": [
                                                                                    payouts,
                                                                                    {
                                                                                        "prim": "Pair",
                                                                                        "args": [
                                                                                            originFees,
                                                                                            {
                                                                                                "prim": "Pair",
                                                                                                "args": [{
                                                                                                    "prim": "None"
                                                                                                },
                                                                                                {
                                                                                                    "prim": "None"
                                                                                                }
                                                                                                ]
                                                                                            }
                                                                                        ]
                                                                                    }
                                                                                ]
                                                                            }
                                                                        ]
                                                                    }
                                                                ]
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    };
};

exports.mkFA12Auction = (
    sellAssetContract,
    buyAssetContract,
    buyAssetId,
    buyAssetType,
    assetQty,
    seller,
    startDate,
    auctionDuration,
    minPrice,
    buyOutPrice,
    minStep,
    payouts,
    originFees,
    dataType,
    data
) => {
    return {
        "prim": "Pair",
        "args": [
            this.mkFA12Asset(sellAssetContract),
            {
                "prim": "Pair",
                "args": [
                    {
                        "int": `${assetQty}`,
                    },
                    {
                        "prim": "Pair",
                        "args": [
                            this.mkBuyAsset(buyAssetType, buyAssetContract, buyAssetId),
                            {
                                "prim": "Pair",
                                "args": [
                                    {
                                        "string": `${seller}`
                                    },
                                    {
                                        "prim": "Pair",
                                        "args": [
                                            this.mkStartDate(startDate),
                                            {
                                                "prim": "Pair",
                                                "args": [
                                                    {
                                                        "int": `${auctionDuration}`
                                                    },
                                                    {
                                                        "prim": "Pair",
                                                        "args": [
                                                            {
                                                                "int": `${minPrice}`
                                                            },
                                                            {
                                                                "prim": "Pair",
                                                                "args": [
                                                                    {
                                                                        "int": `${buyOutPrice}`
                                                                    },
                                                                    {
                                                                        "prim": "Pair",
                                                                        "args": [
                                                                            {
                                                                                "int": `${minStep}`
                                                                            },
                                                                            {
                                                                                "prim": "Pair",
                                                                                "args": [
                                                                                    payouts,
                                                                                    {
                                                                                        "prim": "Pair",
                                                                                        "args": [
                                                                                            originFees,
                                                                                            {
                                                                                                "prim": "Pair",
                                                                                                "args": [{
                                                                                                    "prim": "None"
                                                                                                },
                                                                                                {
                                                                                                    "prim": "None"
                                                                                                }
                                                                                                ]
                                                                                            }
                                                                                        ]
                                                                                    }
                                                                                ]
                                                                            }
                                                                        ]
                                                                    }
                                                                ]
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    };
};

exports.mkXTZAuction = (
    buyAssetContract,
    buyAssetId,
    buyAssetType,
    assetQty,
    seller,
    startDate,
    auctionDuration,
    minPrice,
    buyOutPrice,
    minStep,
    payouts,
    originFees,
    dataType,
    data
) => {
    return {
        "prim": "Pair",
        "args": [
            this.mkXTZAsset(),
            {
                "prim": "Pair",
                "args": [
                    {
                        "int": `${assetQty}`,
                    },
                    {
                        "prim": "Pair",
                        "args": [
                            this.mkBuyAsset(buyAssetType, buyAssetContract, buyAssetId),
                            {
                                "prim": "Pair",
                                "args": [
                                    {
                                        "string": `${seller}`
                                    },
                                    {
                                        "prim": "Pair",
                                        "args": [
                                            this.mkStartDate(startDate),
                                            {
                                                "prim": "Pair",
                                                "args": [
                                                    {
                                                        "int": `${auctionDuration}`
                                                    },
                                                    {
                                                        "prim": "Pair",
                                                        "args": [
                                                            {
                                                                "int": `${minPrice}`
                                                            },
                                                            {
                                                                "prim": "Pair",
                                                                "args": [
                                                                    {
                                                                        "int": `${buyOutPrice}`
                                                                    },
                                                                    {
                                                                        "prim": "Pair",
                                                                        "args": [
                                                                            {
                                                                                "int": `${minStep}`
                                                                            },
                                                                            {
                                                                                "prim": "Pair",
                                                                                "args": [
                                                                                    payouts,
                                                                                    {
                                                                                        "prim": "Pair",
                                                                                        "args": [
                                                                                            originFees,
                                                                                            {
                                                                                                "prim": "Pair",
                                                                                                "args": [{
                                                                                                    "prim": "None"
                                                                                                },
                                                                                                {
                                                                                                    "prim": "None"
                                                                                                }
                                                                                                ]
                                                                                            }
                                                                                        ]
                                                                                    }
                                                                                ]
                                                                            }
                                                                        ]
                                                                    }
                                                                ]
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    };
};

exports.mkBid = (
    assetContract,
    assetId,
    amount,
    bidder,
    payouts,
    originFees,
    bidDataType,
    bidData
) => {
    return {
        "prim": "Pair",
        "args": [
            {
                "string": `${assetContract}`
            },
            {
                "prim": "Pair",
                "args": [
                    {
                        "int": `${assetId}`
                    },
                    {
                        "prim": "Pair",
                        "args": [
                            payouts,
                            {
                                "prim": "Pair",
                                "args": [
                                    originFees,
                                    {
                                        "prim": "Pair",
                                        "args": [
                                            {
                                                "int": `${amount}`
                                            },
                                            {
                                                "prim": "Pair",
                                                "args": [{
                                                    "string": `${bidder}`
                                                },
                                                {
                                                    "prim": "Pair",
                                                    "args": [{
                                                        "prim": "None"
                                                    },
                                                    {
                                                        "prim": "None"
                                                    }
                                                    ]
                                                }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    };
};

// Taquito & Mockup-compliant get big map value
const getBigMapValue = async (id, key, keytyp) => {
    let res = await getValueFromBigMap(id, key, keytyp);
    if (res == null) {
        return 0;
    }
    return Number.parseInt(res.int);
};

const getFA12Balance = async (c, address) => {
    let storage = await c.getStorage();
    let id = storage.ledger;
    let res = await getBigMapValue(
        id,
        { string: address },
        { prim: 'address' }
    );
    return Number.parseInt(res);
};

exports.getFA12Balance = getFA12Balance;

exports.getFA2Balance = async (c, token, address) => {
    let storage = await c.getStorage();
    let id = storage.ledger;
    let key = {
        prim: 'Pair',
        args: [{ int: '' + token }, { string: address }],
    };
    let keytyp = {
        prim: 'pair',
        args: [{ prim: 'nat' }, { prim: 'address' }],
    };
    let res = await getBigMapValue(id, key, keytyp);
    return res;
};

exports.checkFA12Balance = async (c, a, d, f) => {
    const data_before = await getFA12Balance(c, a);
    const balance_before = data_before == null ? 0 : data_before;
    await f();
    const data_after = await getFA12Balance(c, a);
    const balance_after = data_after == null ? 0 : data_after;
    // After Minus Before
    const delta = balance_after - balance_before;
    if (delta !== d) {
        throw new Error(
            'Invalid delta balance of ' +
            delta +
            ' tokens for ' +
            getAccount(a).name
        );
    }
};

exports.checkFA2Balance = async (c, token, address, d, f) => {
    const data_before = await getFA2Balance(c, token, address);
    const balance_before = data_before == null ? 0 : data_before;
    await f();
    const data_after = await getFA2Balance(c, token, address);
    const balance_after = data_after == null ? 0 : data_after;
    // After Minus Before
    const delta = balance_after - balance_before;
    if (delta !== d) {
        throw new Error(
            'Invalid delta balance of ' +
            delta +
            " tokens '" +
            token +
            "' for " +
            getAccount(address).name
        );
    }
};

exports.checkFA2Balance = (gbfa2) => {
    return async (fa2, o, t, v) => {
        await gbfa2.execBalanceof({
            arg: { fa2: fa2.address, owner: o, tokenid: t },
        });
        const storage = await gbfa2.getStorage();
        const res = storage.toNumber();
        if (res !== v) {
            throw new Error(
                'Invalid balance of: expected ' + v + ', got ' + res
            );
        }
    };
};

const isSandbox = () => {
    return getEndpoint() == 'http://localhost:8732' ? true : false;
};

exports.errors = {
    CALLER_NOT_OWNER: '"CALLER_NOT_OWNER"',
    NOT_FOUND: '"NotFound"',
    LEDGER_NOT_FOUND: '(Pair "AssetNotFound" "ledger")',
    INVALID_CALLER: '"InvalidCaller"',
    INVALID_AMOUNT: '"FA2_INVALID_AMOUNT"',
    FA2_INSUFFICIENT_BALANCE: '"FA2_INSUFFICIENT_BALANCE"',
    FA2_NOT_OPERATOR: '"FA2_NOT_OPERATOR"',
    ARCHETYPE_ALREADY_REGISTERED: '"Archetype already registered"',
    ARCHETYPE_INVALID_VALIDATOR:
        '"Archetype requires a minting validator contract address"',
    ARCHETYPE_NOT_REGISTERED: '"Archetype not registered"',
    LIMIT_ALREADY_SET: '"MintingValidator: minting limit already set"',
    SERIAL_OOB: '"MintingValidator: serial number out of bounds"',
    ALREADY_MINTED: '"Token already minted"',
    DEADLINE_REACHED: '"MintingValidator: deadline reached"',
    DEADLINE_ALREADY_SET: '"MintingValidator: deadline already set"',
    MUST_BE_MINTER: '"Must be a minter"',
    DOES_NOT_EXIST: '"Token does not exist"',
    // NOT_WHITELISTED: '"Recipient is not whitelisted"',
    NOT_WHITELISTED: '"TO_NOT_ALLOWED"',
    WHITELIST_TO_RESTRICTED: '"TO_RESTRICTED"',
    NOT_ADMIN: '"Must be an administrator"',
    ERC1155_NOT_APPROVED: '"ERC1155: caller is not owner nor approved"',
    ERC1155_INSUFFICIENT_BALANCE:
        '"ERC1155: insufficient balance for transfer"',
    ARCHETYPE_QUOTA: '"Archetype quota reached"',
    COOLDOWN: '"Transfer cooldown"',
    USDC_WRONG_SIG: '"FiatTokenV2: invalid signature"',
    USDC_BALANCE_TOO_LOW: '"ERC20: transfer amount exceeds balance"',
    USDC_ALLOWANCE_TOO_LOW: '"ERC20: transfer amount exceeds allowance"',
    QUARTZ_MINTER_AUTHORIZATION_EXPIRED:
        '"QUARTZ_MINTER: authorization expired"',
    QUARTZ_MINTER_RECOVER_FAILED: '"QUARTZ_MINTER: invalid signature"',
    PAUSED: '"Pausable: paused"',
    NOT_PAUSED: '"Pausable: not paused"',
    META_TRANSACTION_WRONG_SIGNATURE:
        '"NativeMetaTransaction: WRONG_SIGNATURE"',
    MISSIGNED: '(Pair "MISSIGNED"',
    EXPIRED_PERMIT: '"PERMIT_EXPIRED"',
    EXPIRY_NEGATIVE: '"EXPIRY_NEGATIVE"',
    EXPIRY_TOO_BIG: '"EXPIRY_TOO_BIG"',
    NOT_PERMIT_ISSUER: '"NOT_PERMIT_ISSUER"',
    CONTRACT_PAUSED: '"CONTRACT_PAUSED"',
    KEY_EXISTS: '(Pair "KeyExists" "royalties")',
    TOKEN_METADATA_KEY_EXISTS: '(Pair "KeyExists" "token_metadata")',
};
