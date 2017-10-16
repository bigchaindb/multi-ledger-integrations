/* eslint-disable */

import chai from 'chai'
import sinon from 'sinon'

import testData from './testData'
import getConnection from '../src/connections/getConnection'
import * as parser from '../src/api/requestParsers/messagesParser'

const assert = chai.assert

describe('connection factory test', () => {
    it('should return bdb connection', () => {
        assert.equal(getConnection('bdb', {}).name, 'bdb')
    })

    it('should return iota connection', () => {
        assert.equal(getConnection('iota', {}).name, 'iota')
    })

    it('should return default bdb connection', () => {
        assert.equal(getConnection('', {}).name, 'bdb')
    })
})