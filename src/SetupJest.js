import { mount, shallow } from 'enzyme';
import { ApiMockUtil } from './utils';

global.ApiMockUtil = ApiMockUtil;
global.shallow = shallow;
global.mount = mount;
