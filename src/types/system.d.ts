export interface System {
  computerSystemDto:  ComputerSystemDto;
  processorDto:       ProcessorDto;
  operatingSystemDto: OperatingSystemDto;
  globalMemoryDto:    GlobalMemoryDto;
  powerDto:           PowerDto;
  storageDtoList:     StorageDtoList[];
  graphicsCardDto:    GraphicsCardDto;
}

export interface ComputerSystemDto {
  manufacturer: string;
  model:        string;
  version:      string;
  release_date: Date;
}

export interface GlobalMemoryDto {
  availableMemory:   string;
  usedMemory:        string;
  totalMemory:       string;
  virtualUsedMemory: string;
  virtuallMemory:    string;
  percentage:        number;
}

export interface GraphicsCardDto {
  graphicsCardList: GraphicsCardList[];
}

export interface GraphicsCardList {
  name:        string;
  deviceId:    string;
  vendor:      string;
  versionInfo: string;
  vram:        number;
}

export interface OperatingSystemDto {
  family:         string;
  bitness:        number;
  versionInfo:    VersionInfo;
  systemboottime: Date;
}

export interface VersionInfo {
  version:     string;
  codeName:    string;
  buildNumber: string;
}

export interface PowerDto {
  name:            string;
  deviceName:      string;
  voltage:         string;
  powerOnLine:     boolean;
  charging:        boolean;
  discharging:     boolean;
  currentCapacity: number;
  maxCapacity:     number;
  designCapacity:  number;
  chemistry:       string;
  manufacturer:    string;
}

export interface ProcessorDto {
  name:                string;
  coreCount:           number;
  maxFreq:             string;
  currentFreq:         string;
  bitDepth:            string;
  sensorsVoltage:      string;
  sensoresTemperature: string;
  sensoresSpeedList:   string[];
}

export interface StorageDtoList {
  mainStorage: string;
  total:       string;
  diskCount:   string;
}
