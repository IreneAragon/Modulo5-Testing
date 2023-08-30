import { renderHook, act } from '@testing-library/react';
import { useConfirmationDialog } from './confirmation-dialog.hook';
import * as lookup from 'common/models/lookup';

describe('ConfirmationDialogComponent specs', () => { 

    it('should return the property "isOpen" with false as the default value', () => {
        // Arrange

        // Act
        const { result } = renderHook(() => useConfirmationDialog());
    
        // Assert
        expect(result.current.isOpen).toEqual(false);
    });

    it('should update the value of "isOpen" and "itemTodelete" when onOpenDialog is called with an item', () => {
        // Arrange
        const testItem: lookup.Lookup = {
            "id": "01", 
            "name": "John Doe"
        };
    
        // Act
        const { result } = renderHook(() => useConfirmationDialog());
        act(() => {
            result.current.onOpenDialog(testItem);
        })
    
        // Assert
        expect(result.current.isOpen).toEqual(true);
        expect(result.current.itemToDelete).toStrictEqual(testItem);
    });

    it('should update "itemToDelete" as an empty item when calling "onAccept" function', () => {
        // Arrange
        const emptyTestItem: lookup.Lookup = { 
            id: '', 
            name: '' 
        };
        const createEmptyItemSpy = jest.spyOn(lookup, 'createEmptyLookup');
    
        // Act
        const { result } = renderHook(() => useConfirmationDialog());
        act(() => {
            result.current.onAccept();
        });
    
        // Assert
        expect(result.current.itemToDelete).toEqual(emptyTestItem);
        expect(createEmptyItemSpy).toHaveBeenCalled();
    });

});