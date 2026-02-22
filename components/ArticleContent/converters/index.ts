import { DefaultNodeTypes, SerializedBlockNode } from '@payloadcms/richtext-lexical';
import { JSXConvertersFunction, LinkJSXConverter } from '@payloadcms/richtext-lexical/react';

type NodeTypes = DefaultNodeTypes;

export const jsxConverter: JSXConvertersFunction<NodeTypes> = ({ defaultConverters }) => ({
  ...defaultConverters,
 })