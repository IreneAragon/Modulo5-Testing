import * as React from 'react';
import { render, screen, within } from '@testing-library/react';
import {ConfirmationDialogComponent} from './confirmation-dialog.component';
import userEvent from '@testing-library/user-event';

describe('ConfirmationDialogComponent specs', () => {
    it('should display a dialog when the prop "isOpen" is true', () => {
        // Arrange
        const props = {
            isOpen: true,
            onAccept: jest.fn(),
            onClose: jest.fn(),
            title: "A Great Title",
            labels: {
                closeButton: "Close",
                acceptButton: "Accept",
            },
            children: <p role="paragraph">I'm a cool paragraph!</p>,
        }
  
        // Act
        render(<ConfirmationDialogComponent {...props} />);
        const dialog = screen.getByRole('dialog')
  
        // Assert
        expect(dialog).toBeInTheDocument();
    });
   
    it('should not display a dialog when the prop "isOpen" is false', () => {
        // Arrange
        const props = {
            isOpen: false,
            onAccept: jest.fn(),
            onClose: jest.fn(),
            title: "A Great Title",
            labels: {
                closeButton: "Close",
                acceptButton: "Accept",
            },
            children: <p role="paragraph">I'm a cool paragraph!</p>,
        }
    
        // Act
        render(<ConfirmationDialogComponent {...props} />);
        const dialog = screen.queryByRole('dialog');
    
        // Assert
        expect(dialog).not.toBeInTheDocument();
      });

    it('should display a dialog with the specific paragraph "<p>I\'m a cool paragraph!</p>"', () => {
        // Arrange
        const props = {
            isOpen: true,
            onAccept: jest.fn(),
            onClose: jest.fn(),
            title: "A Great Title",
            labels: {
                closeButton: "Close",
                acceptButton: "Accept",
            },
            children: <p role="paragraph">I'm a cool paragraph!</p>,
        }
        const expectedParagraphText = 'I\'m a cool paragraph!';

        // Act
        render(<ConfirmationDialogComponent {...props} />);
        const dialog = screen.getByRole('dialog');
        const dialogP = within(dialog).getByRole('paragraph');

        // Assert
        expect(dialogP).toBeInTheDocument();
        expect(dialogP.textContent).toEqual(expectedParagraphText);
    });

    it('should call "onAccept" when click the "Accept" button', async  () => {
        // Arrange
        const props = {
            isOpen: true,
            onAccept: jest.fn(),
            onClose: jest.fn(),
            title: "A Great Title",
            labels: {
                closeButton: "Close",
                acceptButton: "Accept",
            },
            children: <p role="paragraph">I'm a cool paragraph!</p>,
        }

        // Act
        render(<ConfirmationDialogComponent {...props} />);
        const dialog = screen.getByRole('dialog');
        const acceptButton = within(dialog).getByRole('button', {name: props.labels.acceptButton})
        await userEvent.click(acceptButton)

        // Assert
        expect(props.onAccept).toHaveBeenCalled();
    });
    
    it('should call "onClose" when click the "Close" button', async  () => {
        // Arrange
        const props = {
            isOpen: true,
            onAccept: jest.fn(),
            onClose: jest.fn(),
            title: "A Great Title",
            labels: {
                closeButton: "Close",
                acceptButton: "Accept",
            },
            children: <p role="paragraph">I'm a cool paragraph!</p>,
        }

        // Act
        render(<ConfirmationDialogComponent {...props} />);
        const dialog = screen.getByRole('dialog');
        const closeButton = within(dialog).getByRole('button', {name: props.labels.closeButton})
        await userEvent.click(closeButton)

        // Assert
        expect(props.onClose).toHaveBeenCalled();
    });
});