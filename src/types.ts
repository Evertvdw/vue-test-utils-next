import {
  Component,
  ComponentOptions,
  Directive,
  Plugin,
  AppConfig,
  VNode,
  VNodeProps,
  FunctionalComponent,
  ComponentInternalInstance
} from 'vue'

export interface RefSelector {
  ref: string
}
export interface NameSelector {
  name: string
  length?: never
}

export type FindAllComponentsSelector =
  | DefinedComponent
  | FunctionalComponent
  | NameSelector
  | string
export type FindComponentSelector = RefSelector | FindAllComponentsSelector

export type Slot = VNode | string | { render: Function } | Function | Component

type SlotDictionary = {
  [key: string]: Slot
}

// From vue next
// https://github.com/vuejs/vue-next/blob/1f2a652a9d2e3bec472fb1786a4c16d6ccfa1fb1/packages/runtime-core/src/h.ts#L53-L58
type RawProps = VNodeProps & {
  // used to differ from a single VNode object as children
  __v_isVNode?: never
  // used to differ from Array children
  [Symbol.iterator]?: never
} & Record<string, any>

export interface MountingOptions<Props, Data = {}> {
  /**
   * Overrides component's default data. Must be a function.
   * @see https://next.vue-test-utils.vuejs.org/api/#data
   */
  data?: () => {} extends Data ? any : Data extends object ? Partial<Data> : any
  /**
   * Sets component props when mounted.
   * @see https://next.vue-test-utils.vuejs.org/api/#props
   */
  props?: (RawProps & Props) | ({} extends Props ? null : never)
  /**
   * @deprecated use `data` instead.
   */
  propsData?: Props
  /**
   * Sets component attributes when mounted.
   * @see https://next.vue-test-utils.vuejs.org/api/#attrs
   */
  attrs?: Record<string, unknown>
  /**
   * Provide values for slots on a component.
   * @see https://next.vue-test-utils.vuejs.org/api/#slots
   */
  slots?: SlotDictionary & {
    default?: Slot
  }
  /**
   * Provides global mounting options to the component.
   */
  global?: GlobalMountOptions
  /**
   * Specify where to mount the component.
   * Can be a valid CSS selector, or an Element connected to the document.
   * @see https://next.vue-test-utils.vuejs.org/api/#attachto
   */
  attachTo?: HTMLElement | string
  /**
   * Automatically stub out all the child components.
   * @default false
   * @see https://next.vue-test-utils.vuejs.org/api/#slots
   */
  shallow?: boolean
}

export type Stub = boolean | Component
export type Stubs = Record<string, Stub> | Array<string>
export type GlobalMountOptions = {
  /**
   * Installs plugins on the component.
   * @see https://next.vue-test-utils.vuejs.org/api/#global-plugins
   */
  plugins?: (Plugin | [Plugin, ...any[]])[]
  /**
   * Customizes Vue application global configuration
   * @see https://v3.vuejs.org/api/application-config.html#application-config
   */
  config?: Partial<Omit<AppConfig, 'isNativeTag'>> // isNativeTag is readonly, so we omit it
  /**
   * Applies a mixin for components under testing.
   * @see https://next.vue-test-utils.vuejs.org/api/#global-mixins
   */
  mixins?: ComponentOptions[]
  /**
   * Mocks a global instance property.
   * This is designed to mock variables injected by third party plugins, not
   * Vue's native properties such as $root, $children, etc.
   * @see https://next.vue-test-utils.vuejs.org/api/#global-mocks
   */
  mocks?: Record<string, any>
  /**
   * Provides data to be received in a setup function via `inject`.
   * @see https://next.vue-test-utils.vuejs.org/api/#global-provide
   */
  provide?: Record<any, any>
  /**
   * Registers components globally for components under testing.
   * @see https://next.vue-test-utils.vuejs.org/api/#global-components
   */
  components?: Record<string, Component | object>
  /**
   * Registers a directive globally for components under testing
   * @see https://next.vue-test-utils.vuejs.org/api/#global-directives
   */
  directives?: Record<string, Directive>
  /**
   * Stubs a component for components under testing.
   * @default "{ transition: true, 'transition-group': true }"
   * @see https://next.vue-test-utils.vuejs.org/api/#global-stubs
   */
  stubs?: Stubs
  /**
   * Allows rendering the default slot content, even when using
   * `shallow` or `shallowMount`.
   * @default false
   * @see https://next.vue-test-utils.vuejs.org/api/#global-renderstubdefaultslot
   */
  renderStubDefaultSlot?: boolean
}

export type VueNode<T extends Node = Node> = T & {
  __vue_app__?: any
  __vueParentComponent?: ComponentInternalInstance
}

export type VueElement = VueNode<Element>

export type DefinedComponent = new (...args: any[]) => any
