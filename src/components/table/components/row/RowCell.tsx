import classNames from 'classnames';
import React from 'react'
import defaultClasses from '../table.module.css';
import { HeaderCellProps } from '../../../../types/common/components';

function RowCell(props: HeaderCellProps): React.ReactElement {
    const { children, className, passOnProps, table, colspan } = props;

    const classes = classNames(
        defaultClasses.tableCell,
        {
            [defaultClasses.tableCellBody]: table == null,
            [defaultClasses.tableCellHeader]: table?.head,
            [defaultClasses.tableCellFooter]: table?.footer
        },
        className
    );

    return (
        <td
            className={classes}
            {...passOnProps}
            colSpan={colspan}
            onClick={props.onClick}
        >
            {children}
        </td>
    );
};

export default RowCell
