import * as react_jsx_runtime from 'react/jsx-runtime';
import { AriaTableProps } from 'react-aria';
import { TableStateProps } from 'react-stately';

type TableProps<T> = {
    readonly className?: string;
} & AriaTableProps & TableStateProps<T>;
declare function Table<T extends object>(props: TableProps<T>): react_jsx_runtime.JSX.Element;

export { Table, type TableProps };
