/* global describe it before after afterEach */
// During the test the env variable is set to test
process.env.NODE_ENV = 'test';
// Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const constants = require('../api/constants');
const { OK, BAD_REQUEST, NOT_FOUND } = constants.STATUS_CODES;
const tools = require('./util/tools/tools.js');
const LedSignFunctions =
  require('../api/printingRPC/client/ledsign/led_sign_client');
const sinon = require('sinon');
const SignLog = require('../api/models/SignLog');
const SceApiTester = require('./util/tools/SceApiTester');

let app = null;
let test = null;
const expect = chai.expect;

chai.should();
chai.use(chaiHttp);

const INVALID_SIGN_REQUEST = {
  text: 'Big Oof',
  brightness: 50,
  scrollSpeed: 50,
  backgroundColor: '#00FF00',
  textColor: '#FF0000',
  borderColor: '#0000FF',
  email: 'bigoof@gmail.com'
};
const VALID_SIGN_REQUEST = {
  text: 'Big Oof',
  brightness: 50,
  scrollSpeed: 50,
  backgroundColor: '#00FF00',
  textColor: '#FF0000',
  borderColor: '#0000FF',
  firstName: 'John Doe',
  email: 'bigoof@gmail.com'
};
const SUCCESS_MESSAGE = {
  message: {
    getText: () => {
      return VALID_SIGN_REQUEST.text;
    },
    getBrightness: () => {
      return VALID_SIGN_REQUEST.brightness;
    },
    getScrollSpeed: () => {
      return VALID_SIGN_REQUEST.scrollSpeed;
    },
    getBackgroundColor: () => {
      return VALID_SIGN_REQUEST.backgroundColor;
    },
    getTextColor: () => {
      return VALID_SIGN_REQUEST.textColor;
    },
    getBorderColor: () => {
      return VALID_SIGN_REQUEST.borderColor;
    }
  }
};
const ERROR_MESSAGE = 'error';

describe('LedSign', () => {
  let healthCheckMock;
  let updateSignTextMock;

  before(done => {
    healthCheckMock = sinon.stub(LedSignFunctions, 'healthCheck');
    updateSignTextMock = sinon.stub(LedSignFunctions, 'updateSignText');
    app = tools.initializeServer(__dirname + '/../api/routes/LedSign.js');
    test = new SceApiTester(app);
    tools.emptySchema(SignLog);
    done();
  });

  after(done => {
    healthCheckMock.restore();
    updateSignTextMock.restore();
    sinon.restore();
    tools.terminateServer(done);
  });

  afterEach(() => {
    healthCheckMock.reset();
    updateSignTextMock.reset();
  });

  describe('/POST healthCheck', () => {
    let signResponse = null;
    let officer = 'thai';
    it('Should return statusCode 200 when the sign is up', async () => {
      healthCheckMock.resolves(SUCCESS_MESSAGE);
      const response = await test.sendPostRequest(
        '/api/LedSign/healthCheck', officer);
      signResponse = response.body;
      expect(response).to.have.status(OK);
    });
    it('Should return the correct values when modified', async () => {
      healthCheckMock.resolves(SUCCESS_MESSAGE);
      expect(signResponse.text).to.equal(VALID_SIGN_REQUEST.text);
      expect(signResponse.brightness).to.equal(VALID_SIGN_REQUEST.brightness);
      expect(signResponse.scrollSpeed).to.equal(VALID_SIGN_REQUEST.scrollSpeed);
      expect(signResponse.backgroundColor)
        .to.equal(VALID_SIGN_REQUEST.backgroundColor);
      expect(signResponse.textColor).to.equal(VALID_SIGN_REQUEST.textColor);
      expect(signResponse.borderColor).to.equal(VALID_SIGN_REQUEST.borderColor);
    });
    it('Should return statusCode 404 when the sign is down', async () => {
      healthCheckMock.rejects(ERROR_MESSAGE);
      const response = await test.sendPostRequest(
        '/api/LedSign/healthCheck', officer);
      expect(response).to.have.status(NOT_FOUND);
    });
  });

  describe('/POST updateSignText', () => {
    it('Should return statusCode 200 when the sign' +
      'text is updated', async () => {
      updateSignTextMock.resolves(SUCCESS_MESSAGE);
      const response = await test.sendPostRequest(
        '/api/LedSign/updateSignText', VALID_SIGN_REQUEST);
      expect(response).to.have.status(OK);
    });
    it('Should return statusCode 400 when the sign is down', async () => {
      updateSignTextMock.rejects(ERROR_MESSAGE);
      const response = await test.sendPostRequest(
        '/api/LedSign/updateSignText', null);
      expect(response).to.have.status(BAD_REQUEST);
    });
    it('Should return 400 when required fields are not filled', async () => {
      updateSignTextMock.resolves(SUCCESS_MESSAGE);
      const response = await test.sendPostRequest(
        '/api/LedSign/updateSignText', INVALID_SIGN_REQUEST);
      expect(response).to.have.status(BAD_REQUEST);
    });
  });

  describe('/GET getSignLogs', () => {
    it('Should return an object of all events', async () => {
      const response = await test.sendGetRequest(
        '/api/LedSign/getSignLogs');
      expect(response).to.have.status(OK);
      const getSignResponse = response.body;
      getSignResponse.should.be.a('array');
      expect(getSignResponse).to.have.length(1);
      expect(getSignResponse[0].signTitle)
        .to.equal(VALID_SIGN_REQUEST.text);
      expect(getSignResponse[0].firstName)
        .to.equal(VALID_SIGN_REQUEST.firstName);
      expect(getSignResponse[0].email).to.equal(VALID_SIGN_REQUEST.email);
    });
  });
});
