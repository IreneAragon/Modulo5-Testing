import React from 'react';
import { render, screen } from '@testing-library/react';
import { SpinnerComponent } from './spinner.component';
import * as promiseTracker from 'react-promise-tracker/lib/trackerHook';

describe('spinner component spec', () => {

    it('Should not render modal when "promiseTracker" set to false', () => {
        // Arrange
        const promiseTrackerStub = jest
            .spyOn(promiseTracker, 'usePromiseTracker')
            .mockReturnValue({ promiseInProgress: false });
    
        // Act
        render(<SpinnerComponent />);
        const presentation = screen.queryByRole('presentation');
    
        // Assert
        expect(presentation).not.toBeInTheDocument();
    });

    it('Should not render modal when "promiseTracker" set to true', () => {
        // Arrange
        const promiseTrackerStub = jest
                .spyOn(promiseTracker, 'usePromiseTracker')
                .mockReturnValue({ promiseInProgress: true });
  
        // Act
        render(<SpinnerComponent />);
        const presentation = screen.queryByRole('presentation');
    
        // Assert
        expect(presentation).toBeInTheDocument();
    });
});