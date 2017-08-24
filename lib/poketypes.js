exports.types = ['normal', 'fighting', 'flying', 'poison', 'ground', 'rock', 'bug', 'ghost', 'steel', 'fire', 'water', 'grass', 'electric', 'psychic', 'ice', 'dragon', 'dark', 'fairy'];

const chart = [
	[1,      1,      1,      1,      1,      0.5,    1,      0,      0.5,    1,      1,      1,      1,      1,      1,      1,      1,      1  ],
	[2,      1,      0.5,    0.5,    1,      2,      0.5,    0,      2,      1,      1,      1,      1,      0.5,    2,      1,      2,      0.5],
	[1,      2,      1,      1,      1,      0.5,    2,      1,      0.5,    1,      1,      2,      0.5,    1,      1,      1,      1,      1  ],
	[1,      1,      1,      0.5,    0.5,    0.5,    1,      0.5,    0,      1,      1,      2,      1,      1,      1,      1,      1,      2  ],
	[1,      1,      0,      2,      1,      2,      0.5,    1,      2,      2,      1,      0.5,    2,      1,      1,      1,      1,      1  ],
	[1,      0.5,    2,      1,      0.5,    1,      2,      1,      0.5,    2,      1,      1,      1,      1,      2,      1,      1,      1  ],
	[1,      0.5,    0.5,    0.5,    1,      1,      1,      0.5,    0.5,    0.5,    1,      2,      1,      2,      1,      1,      2,      0.5],
	[0,      1,      1,      1,      1,      1,      1,      2,      1,      1,      1,      1,      1,      2,      1,      1,      0.5,    1  ],
	[1,      1,      1,      1,      1,      2,      1,      1,      0.5,    0.5,    0.5,    1,      0.5,    1,      2,      1,      1,      2  ],
	[1,      1,      1,      1,      1,      0.5,    2,      1,      2,      0.5,    0.5,    2,      1,      1,      2,      0.5,    1,      1  ],
	[1,      1,      1,      1,      2,      2,      1,      1,      1,      2,      0.5,    0.5,    1,      1,      1,      0.5,    1,      1  ],
	[1,      1,      0.5,    0.5,    2,      2,      0.5,    1,      0.5,    0.5,    2,      0.5,    1,      1,      1,      0.5,    1,      1  ],
	[1,      1,      2,      1,      0,      1,      1,      1,      1,      1,      2,      0.5,    0.5,    1,      1,      0.5,    1,      1  ],
	[1,      2,      1,      2,      1,      1,      1,      1,      0.5,    1,      1,      1,      1,      0.5,    1,      1,      0,      1  ],
	[1,      1,      2,      1,      2,      1,      1,      1,      0.5,    0.5,    0.5,    2,      1,      1,      0.5,    2,      1,      1  ],
	[1,      1,      1,      1,      1,      1,      1,      1,      0.5,    1,      1,      1,      1,      1,      1,      2,      1,      0  ],
	[1,      0.5,    1,      1,      1,      1,      1,      2,      1,      1,      1,      1,      1,      2,      1,      1,      0.5,    0.5],
	[1,      2,      1,      0.5,    1,      1,      1,      1,      0.5,    0.5,    1,      1,      1,      1,      1,      2,      2,      1  ]
];

exports.effectiveness = function(attackingType, defendingType1, defendingType2) {
	if (isNaN(attackingType)) attackingType = this.types.indexOf(attackingType.toLowerCase());
	if (isNaN(defendingType1)) defendingType1 = this.types.indexOf(defendingType1.toLowerCase());
	if (isNaN(defendingType2)) defendingType2 = this.types.indexOf(defendingType2.toLowerCase());
	
	var effectiveness = chart[attackingType][defendingType1];
	if (defendingType2 !== undefined && defendingType2 != defendingType1) effectiveness *= chart[attackingType][defendingType2];
	
	return effectiveness;
}