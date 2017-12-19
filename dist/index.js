'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _values = require('babel-runtime/core-js/object/values');

var _values2 = _interopRequireDefault(_values);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _assign2 = require('lodash/assign');

var _assign3 = _interopRequireDefault(_assign2);

var _forOwn2 = require('lodash/forOwn');

var _forOwn3 = _interopRequireDefault(_forOwn2);

var _flatMap2 = require('lodash/flatMap');

var _flatMap3 = _interopRequireDefault(_flatMap2);

var _forEach2 = require('lodash/forEach');

var _forEach3 = _interopRequireDefault(_forEach2);

var _fromPairs2 = require('lodash/fromPairs');

var _fromPairs3 = _interopRequireDefault(_fromPairs2);

var _defaultsDeep2 = require('lodash/defaultsDeep');

var _defaultsDeep3 = _interopRequireDefault(_defaultsDeep2);

var _truffleContract = require('truffle-contract');

var _truffleContract2 = _interopRequireDefault(_truffleContract);

var _web = require('web3');

var _web2 = _interopRequireDefault(_web);

var _ipfsMini = require('ipfs-mini');

var _ipfsMini2 = _interopRequireDefault(_ipfsMini);

var _lmsr = require('./lmsr');

var lmsr = _interopRequireWildcard(_lmsr);

var _utils = require('./utils');

var utils = _interopRequireWildcard(_utils);

var _oracles = require('./oracles');

var oracles = _interopRequireWildcard(_oracles);

var _events = require('./events');

var events = _interopRequireWildcard(_events);

var _markets = require('./markets');

var markets = _interopRequireWildcard(_markets);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var windowLoaded = new _promise2.default(function (accept, reject) {
    if (typeof window === 'undefined') return accept();

    if (typeof window.addEventListener !== 'function') return reject(new Error('expected to be able to register event listener'));

    window.addEventListener('load', function loadHandler(event) {
        window.removeEventListener('load', loadHandler, false);
        return accept(event);
    }, false);
});

var gasStatsData = require('@gnosis.pm/gnosis-core-contracts/build/gas-stats.json');
var gasLimit = 4e6;
var gasDefaultMaxMultiplier = 1.5;

var implementationInterfaceMap = {
    StandardMarket: ['Market']
};

var contractArtifacts = ['Math', 'Event', 'CategoricalEvent', 'ScalarEvent', 'EventFactory', 'Token', 'HumanFriendlyToken', 'EtherToken', 'CentralizedOracle', 'CentralizedOracleFactory', 'UltimateOracle', 'UltimateOracleFactory', 'LMSRMarketMaker', 'Market', 'StandardMarket', 'StandardMarketFactory'].map(function (name) {
    return require('@gnosis.pm/gnosis-core-contracts/build/contracts/' + name + '.json');
});

contractArtifacts.push(require('@gnosis.pm/olympia-token/build/contracts/OlympiaToken.json'));

var instanceModules = [oracles, events, markets];

/**
 * Represents the gnosis.js API
 */

var Gnosis = function () {
    (0, _createClass3.default)(Gnosis, null, [{
        key: 'create',

        /**
         * Factory function for asynchronously creating an instance of the API
         *
         * Note: this method is asynchronous and will return a Promise
         *
         * @param {(string|Provider)} [opts.ethereum] - An instance of a Web3 provider or a URL of a Web3 HTTP provider. If not specified, Web3 provider will be either the browser-injected Web3 (Mist/MetaMask) or an HTTP provider looking at http://localhost:8545
         * @param {string} [opts.defaultAccount] - The account to use as the default `from` address for ethereum transactions conducted through the Web3 instance. If unspecified, will be the first account found on Web3. See {@link Gnosis#setWeb3Provider} `defaultAccount` parameter for more info.
         * @param {Object} [opts.ipfs] - ipfs-mini configuration object
         * @param {string} [opts.ipfs.host='ipfs.infura.io'] - IPFS node address
         * @param {Number} [opts.ipfs.port=5001] - IPFS protocol port
         * @param {string} [opts.ipfs.protocol='https'] - IPFS protocol name
         * @param {Function} [opts.logger] - A callback for logging. Can also provide 'console' to use `console.log`.
         * @returns {Gnosis} An instance of the gnosis.js API
         */
        value: function () {
            var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(opts) {
                var gnosis;
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                opts = (0, _defaultsDeep3.default)(opts || {}, {
                                    ipfs: {
                                        host: 'ipfs.infura.io',
                                        port: 5001,
                                        protocol: 'https'
                                    }
                                });

                                gnosis = new Gnosis(opts);
                                _context.next = 4;
                                return gnosis.initialized(opts);

                            case 4:
                                return _context.abrupt('return', gnosis);

                            case 5:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function create(_x) {
                return _ref.apply(this, arguments);
            }

            return create;
        }()

        /**
         * **Warning:** Do not use constructor directly. Some asynchronous initialization will not be handled. Instead, use {@link Gnosis.create}.
         * @constructor
         */

    }]);

    function Gnosis(opts) {
        var _this = this;

        (0, _classCallCheck3.default)(this, Gnosis);

        // Logger setup
        var logger = opts.logger;

        this.log = logger == null ? function () {} : logger === 'console' ? console.log : logger;

        // IPFS instantiation
        this.ipfs = utils.promisifyAll(new _ipfsMini2.default(opts.ipfs));

        /**
         * A collection of Truffle contract abstractions for the following Gnosis contracts:
         *
         * - [Math](https://gnosis.github.io/gnosis-contracts/docs/Math)
         * - [Event](https://gnosis.github.io/gnosis-contracts/docs/Event)
         * - [CategoricalEvent](https://gnosis.github.io/gnosis-contracts/docs/CategoricalEvent)
         * - [ScalarEvent](https://gnosis.github.io/gnosis-contracts/docs/ScalarEvent)
         * - [EventFactory](https://gnosis.github.io/gnosis-contracts/docs/EventFactory)
         * - [Token](https://gnosis.github.io/gnosis-contracts/docs/Token)
         * - [HumanFriendlyToken](https://gnosis.github.io/gnosis-contracts/docs/HumanFriendlyToken)
         * - [EtherToken](https://gnosis.github.io/gnosis-contracts/docs/EtherToken)
         * - [CentralizedOracle](https://gnosis.github.io/gnosis-contracts/docs/CentralizedOracle)
         * - [CentralizedOracleFactory](https://gnosis.github.io/gnosis-contracts/docs/CentralizedOracleFactory)
         * - [UltimateOracle](https://gnosis.github.io/gnosis-contracts/docs/UltimateOracle)
         * - [UltimateOracleFactory](https://gnosis.github.io/gnosis-contracts/docs/UltimateOracleFactory)
         * - [LMSRMarketMaker](https://gnosis.github.io/gnosis-contracts/docs/LMSRMarketMaker)
         * - [Market](https://gnosis.github.io/gnosis-contracts/docs/Market)
         * - [StandardMarket](https://gnosis.github.io/gnosis-contracts/docs/StandardMarket)
         * - [StandardMarketFactory](https://gnosis.github.io/gnosis-contracts/docs/StandardMarketFactory)
         * - [OlympiaToken](https://github.com/gnosis/olympia-token)
         *
         * These are configured to use the web3 provider specified in {@link Gnosis.create} or subsequently modified with {@link Gnosis#setWeb3Provider}. The default gas costs for these abstractions are set to the maximum cost of their respective entries found in the `gas-stats.json` file built from the [core contracts](https://github.com/gnosis/gnosis-contracts#readme). Additionally, the default message sender (i.e. `from` address) is set via the optional `defaultAccount` param in {@link Gnosis#setWeb3Provider}.
         *
         * @member {Object} Gnosis#contracts
         */
        this.contracts = (0, _fromPairs3.default)(contractArtifacts.map(function (artifact) {
            var c = (0, _truffleContract2.default)(artifact);
            var name = c.contract_name;

            if (gasStatsData[name] != null) {
                c.prototype.gasStats = gasStatsData[name];
                c.addProp('gasStats', function () {
                    return gasStatsData[name];
                });
            }

            return [name, c];
        }));

        (0, _forEach3.default)(this.contracts, function (c, name, cs) {
            var maxGasCost = Math.max.apply(Math, (0, _toConsumableArray3.default)((0, _values2.default)(c.gasStats || {}).map(function (fnStats) {
                return fnStats.max != null ? fnStats.max.gasUsed : -Infinity;
            })).concat((0, _toConsumableArray3.default)((0, _flatMap3.default)(implementationInterfaceMap[name] || [], function (implName) {
                return (0, _values2.default)(cs[implName].gasStats || {}).map(function (fnStats) {
                    return fnStats.max != null ? fnStats.max.gasUsed : -Infinity;
                });
            }))));

            if (maxGasCost > 0) {
                c.defaults({ gas: Math.min(gasLimit, gasDefaultMaxMultiplier * maxGasCost | 0) });
            }
        });

        this.TruffleContract = _truffleContract2.default;

        instanceModules.forEach(function (module) {
            (0, _keys2.default)(module).forEach(function (instanceProp) {
                if (_this[instanceProp] != null && typeof _this[instanceProp].estimateGas === 'function') {
                    _this[instanceProp].estimateGas = _this[instanceProp].estimateGas.bind(_this);
                }
            });
        });
    }

    (0, _createClass3.default)(Gnosis, [{
        key: 'initialized',
        value: function () {
            var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(opts) {
                return _regenerator2.default.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _context2.next = 2;
                                return this.setWeb3Provider(opts.ethereum, opts.defaultAccount);

                            case 2:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function initialized(_x2) {
                return _ref2.apply(this, arguments);
            }

            return initialized;
        }()

        /**
         * Setter for the ethereum web3 provider.
         *
         * Note: this method is asynchronous and will return a Promise
         *
         * @param {(string|Provider)} [provider] - An instance of a Web3 provider or a URL of a Web3 HTTP provider. If not specified, Web3 provider will be either the browser-injected Web3 (Mist/MetaMask) or an HTTP provider looking at http://localhost:8545
         * @param {(string)} [defaultAccount] - An address to be used as the default `from` account for conducting transactions using the associated Web3 instance. If not specified, will be inferred from Web3 using the first account obtained by `web3.eth.getAccounts`. If no such account exists, default account will not be set.
         */

    }, {
        key: 'setWeb3Provider',
        value: function () {
            var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(provider, defaultAccount) {
                var _this2 = this;

                var accounts;
                return _regenerator2.default.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                if (!(provider == null)) {
                                    _context3.next = 6;
                                    break;
                                }

                                _context3.next = 3;
                                return windowLoaded;

                            case 3:

                                if (typeof web3 !== 'undefined') {
                                    this.web3 = new _web2.default(web3.currentProvider);
                                } else {
                                    this.web3 = new _web2.default(new _web2.default.providers.HttpProvider('http://localhost:8545'));
                                }
                                _context3.next = 15;
                                break;

                            case 6:
                                if (!(typeof provider === 'string')) {
                                    _context3.next = 10;
                                    break;
                                }

                                this.web3 = new _web2.default(new _web2.default.providers.HttpProvider(provider));
                                _context3.next = 15;
                                break;

                            case 10:
                                if (!((typeof provider === 'undefined' ? 'undefined' : (0, _typeof3.default)(provider)) === 'object' && typeof provider.send === 'function' && typeof provider.sendAsync === 'function')) {
                                    _context3.next = 14;
                                    break;
                                }

                                this.web3 = new _web2.default(provider);
                                _context3.next = 15;
                                break;

                            case 14:
                                throw new TypeError('provider of type \'' + (typeof provider === 'undefined' ? 'undefined' : (0, _typeof3.default)(provider)) + '\' not supported');

                            case 15:

                                (0, _forOwn3.default)(this.contracts, function (c) {
                                    c.setProvider(_this2.web3.currentProvider);
                                });

                                if (!(defaultAccount == null)) {
                                    _context3.next = 23;
                                    break;
                                }

                                _context3.next = 19;
                                return utils.promisify(this.web3.eth.getAccounts)();

                            case 19:
                                accounts = _context3.sent;


                                if (accounts.length > 0) {
                                    this.setDefaultAccount(accounts[0]);
                                }
                                _context3.next = 24;
                                break;

                            case 23:
                                this.setDefaultAccount(defaultAccount);

                            case 24:
                                _context3.next = 26;
                                return _promise2.default.all([
                                /**
                                 * If [EtherToken](https://gnosis.github.io/gnosis-contracts/docs/EtherToken/) is deployed to the current network, this will be set to an EtherToken contract abstraction pointing at the deployment address.
                                 *
                                 * @member {Contract} Gnosis#etherToken
                                 */
                                this.trySettingContractInstance('etherToken', this.contracts.EtherToken),

                                /**
                                 * If [StandardMarketFactory](https://gnosis.github.io/gnosis-contracts/docs/StandardMarketFactory/) is deployed to the current network, this will be set to an StandardMarketFactory contract abstraction pointing at the deployment address.
                                 *
                                 * @member {Contract} Gnosis#standardMarketFactory
                                 */
                                this.trySettingContractInstance('standardMarketFactory', this.contracts.StandardMarketFactory),

                                /**
                                 * If [LMSRMarketMaker](https://gnosis.github.io/gnosis-contracts/docs/LMSRMarketMaker/) is deployed to the current network, this will be set to an LMSRMarketMaker contract abstraction pointing at the deployment address.
                                 *
                                 * @member {Contract} Gnosis#lmsrMarketMaker
                                 */
                                this.trySettingContractInstance('lmsrMarketMaker', this.contracts.LMSRMarketMaker),

                                /**
                                 * If [OlympiaToken](https://github.com/gnosis/olympia-token) is deployed to the current network (this should only work for Rinkeby), this will be set to an OlympiaToken contract abstraction pointing at the deployment address.
                                 *
                                 * @member {Contract} Gnosis#olympiaToken
                                 */
                                this.trySettingContractInstance('olympiaToken', this.contracts.OlympiaToken)]);

                            case 26:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));

            function setWeb3Provider(_x3, _x4) {
                return _ref3.apply(this, arguments);
            }

            return setWeb3Provider;
        }()
    }, {
        key: 'trySettingContractInstance',
        value: function () {
            var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(instanceName, contract) {
                return _regenerator2.default.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                _context4.prev = 0;
                                _context4.next = 3;
                                return contract.deployed();

                            case 3:
                                this[instanceName] = _context4.sent;
                                _context4.next = 11;
                                break;

                            case 6:
                                _context4.prev = 6;
                                _context4.t0 = _context4['catch'](0);

                                delete this[instanceName];

                                if (_context4.t0.message.includes('has not been deployed to detected network')) {
                                    _context4.next = 11;
                                    break;
                                }

                                throw _context4.t0;

                            case 11:
                            case 'end':
                                return _context4.stop();
                        }
                    }
                }, _callee4, this, [[0, 6]]);
            }));

            function trySettingContractInstance(_x5, _x6) {
                return _ref4.apply(this, arguments);
            }

            return trySettingContractInstance;
        }()
    }, {
        key: 'setDefaultAccount',
        value: function setDefaultAccount(account) {
            /**
             * The default account to be used as the `from` address for transactions done with this Gnosis instance. If there is no account, this will not be set.
             *
             * @member {string} Gnosis#defaultAccount
             */
            this.defaultAccount = account;
            (0, _forOwn3.default)(this.contracts, function (c) {
                c.defaults({
                    from: account
                });
            });
        }
    }]);
    return Gnosis;
}();

_assign3.default.apply(undefined, [Gnosis.prototype].concat(instanceModules));
(0, _assign3.default)(Gnosis, lmsr, utils);

exports.default = Gnosis;
module.exports = exports['default'];
//# sourceMappingURL=index.js.map