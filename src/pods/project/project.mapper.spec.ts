import * as apiModel from './api/project.api-model';
import { mapProjectFromApiToVm } from './project.mapper';

describe('Project mapper specs', () => {
  it('Should return a project upon being provided with a valid viewModel project.', () => {
    // Arrange
    const project: apiModel.Project = {
      id: '1',
      name: 'test',
      isActive: false,
      employees: [
        { 
          id: '1', 
          employeeName: 'test' 
        },
        { 
          id: '2', 
          employeeName: 'test2' 
        }
      ],
    };

    // Act
    const result = mapProjectFromApiToVm(project);

    // Assert
    expect(result).not.toBeNull();
    expect(result.employees.length).toEqual(2);
  });

  it('should return a valid project with empty values upon being provided with an undefined project', () => {
    // Arrange
    const project: apiModel.Project = undefined;
    const testProject: apiModel.Project = {
      id: '',
      name: '',
      externalId: '',
      comments: '',
      isActive: false,
      employees: [],
    };

    // Act
    const result = mapProjectFromApiToVm(project);
  
    // Assert
    expect(result).not.toBeUndefined();
    expect(result).toEqual(testProject);
  });
});