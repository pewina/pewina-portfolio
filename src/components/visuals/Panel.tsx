import {
  BarsPanel,
  CodePanel,
  CurvePanel,
  HeatmapPanel,
  HexPanel,
  LogPanel,
  MoodPanel,
  NetworkPanel,
  PipelinePanel,
  PulsePanel,
  ScatterPanel,
  TopologyPanel,
  WeatherPanel,
} from './Panels';
import {
  FactorsPanel,
  GuidePanel,
  ImbalancePanel,
  ModelsPanel,
  RoutingPanel,
} from './DiagramPanels';

export type PanelKind =
  | 'network'
  | 'curve'
  | 'pulse'
  | 'scatter'
  | 'pipeline'
  | 'weather'
  | 'mood'
  | 'topology'
  | 'log'
  | 'code'
  | 'bars'
  | 'heatmap'
  | 'hex'
  | 'factors'
  | 'guide'
  | 'routing'
  | 'imbalance'
  | 'models';

export interface VisualSpec {
  kind: PanelKind;
  accent?: string;
  seed?: number;
  /** pipeline step labels */
  steps?: string[];
  /** centre label for 'factors' */
  center?: string;
  /** four labels for 'factors', or three targets for 'routing' */
  labels?: string[];
}

export default function Panel({ spec }: { spec: VisualSpec }) {
  const { kind, accent, seed, steps, center, labels } = spec;
  switch (kind) {
    case 'network':
      return <NetworkPanel accent={accent} seed={seed} />;
    case 'curve':
      return <CurvePanel accent={accent} />;
    case 'pulse':
      return <PulsePanel accent={accent} seed={seed} />;
    case 'scatter':
      return <ScatterPanel accent={accent} seed={seed} />;
    case 'pipeline':
      return <PipelinePanel accent={accent} steps={steps} />;
    case 'weather':
      return <WeatherPanel />;
    case 'mood':
      return <MoodPanel />;
    case 'topology':
      return <TopologyPanel accent={accent} seed={seed} />;
    case 'log':
      return <LogPanel accent={accent} seed={seed} />;
    case 'code':
      return <CodePanel accent={accent} />;
    case 'bars':
      return <BarsPanel accent={accent} seed={seed} />;
    case 'heatmap':
      return <HeatmapPanel accent={accent} seed={seed} />;
    case 'hex':
      return <HexPanel accent={accent} seed={seed} />;
    case 'factors':
      return <FactorsPanel accent={accent} center={center} labels={labels} />;
    case 'guide':
      return <GuidePanel accent={accent} />;
    case 'routing':
      return <RoutingPanel accent={accent} targets={labels} />;
    case 'imbalance':
      return <ImbalancePanel accent={accent} />;
    case 'models':
      return <ModelsPanel accent={accent} />;
  }
}
