import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import expect from 'expect.js';
import Button from '../src/index';

describe('Test', () => {
    describe('render', () => {
        it('should render', () => {
            const wrapper = mount(<Button />);
            expect(wrapper.hasClass('ui-btn')).to.equal(true);
        });
        it('should render type', () => {
            const wrapper = mount(<Button type="primary"/>);
            expect(wrapper.hasClass('ui-btn-primary')).to.equal(true);
        });
        it('should support event', () => {
            let test = false;
            const wrapper = mount(<Button onClick={() => test = true}/>);
            wrapper.simulate('click');
            expect(test).to.equal(true);
        })
    });
});
