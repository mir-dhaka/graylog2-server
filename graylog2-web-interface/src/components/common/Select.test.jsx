import React from 'react';
import { mount, shallow } from 'enzyme';

import SelectComponent, { components as Components } from 'react-select';
import Select from './Select';

describe('Select', () => {
  describe('Upgrade to react-select v2', () => {
    const options = [{ label: 'label', value: 'value' }];
    const onChange = () => { };

    it('should convert multi to isMulti', () => {
      const multiWrapper = shallow(<Select multi options={options} onChange={onChange} />);
      expect(multiWrapper.props().isMulti).toBeTruthy();

      const nonMultiWrapper = shallow(<Select options={options} onChange={onChange} />);
      expect(nonMultiWrapper.props().isMulti).toBeFalsy();
    });

    it('should convert disabled to isDisabled', () => {
      const disabledWrapper = shallow(<Select disabled options={options} onChange={onChange} />);
      expect(disabledWrapper.props().isDisabled).toBeTruthy();

      const enabledWrapper = shallow(<Select options={options} onChange={onChange} />);
      expect(enabledWrapper.props().isDisabled).toBeFalsy();
    });

    it('should convert clearable to isClearable', () => {
      const clearableWrapper = shallow(<Select options={options} onChange={onChange} />);
      expect(clearableWrapper.props().isClearable).toBeTruthy();

      const nonClearableWrapper = shallow(<Select clearable={false} options={options} onChange={onChange} />);
      expect(nonClearableWrapper.props().isClearable).toBeFalsy();
    });

    it('should use displayKey to select the option label', () => {
      const customOptions = [{ customLabel: 'my great label', value: 'value' }];
      const wrapper = mount(<Select options={customOptions} onChange={onChange} displayKey="customLabel" menuIsOpen />);
      expect(wrapper.find(Components.Option).props().children).toBe('my great label');
    });

    it('should use valueKey to select the option value', () => {
      const customOptions = [{ label: 'label', customValue: 42 }];
      const wrapper = mount(<Select options={customOptions} onChange={onChange} valueKey="customValue" menuIsOpen />);
      expect(wrapper.find(Components.Option).props().value).toBe(42);
    });

    it('should use matchProp to configure how options are filtered', () => {
      const matchAnyWrapper = shallow(<Select options={options} onChange={onChange} />);
      const matchAnyFilter = matchAnyWrapper.find(SelectComponent).props().filterOption;
      expect(matchAnyFilter(options[0], 'label')).toBeTruthy();
      expect(matchAnyFilter(options[0], 'value')).toBeTruthy();

      const matchLabelWrapper = shallow(<Select options={options} onChange={onChange} matchProp="label" />);
      const matchLabelFilter = matchLabelWrapper.find(SelectComponent).props().filterOption;
      expect(matchLabelFilter(options[0], 'label')).toBeTruthy();
      expect(matchLabelFilter(options[0], 'value')).toBeFalsy();

      const matchValueWrapper = shallow(<Select options={options} onChange={onChange} matchProp="value" />);
      const matchValueFilter = matchValueWrapper.find(SelectComponent).props().filterOption;
      expect(matchValueFilter(options[0], 'label')).toBeFalsy();
      expect(matchValueFilter(options[0], 'value')).toBeTruthy();
    });

    it('should use optionRenderer to customize options\' appearance', () => {
      const optionRenderer = option => `Custom ${option.label}`;
      const wrapper = mount(<Select options={options} onChange={onChange} optionRenderer={optionRenderer} menuIsOpen />);
      expect(wrapper.find(Components.Option).props().children).toBe('Custom label');
    });
  });
});
