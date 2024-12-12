export interface ComputerSystemDto {
	manufacturer: string;
	model: string;
	version: string;
	release_date: string;
}

export interface ProcessorDto {
	name: string;
	coreCount: number;
	maxFreq: string;
	currentFreq: string;
	bitDepth: string;
	sensorsVoltage: string;
	sensoresTemperature: string;
	sensoresSpeedList: string[];
	usedRate: string;
}

export interface VersionInfo {
	version: string;
	codeName: string;
	buildNumber: string;
}

export interface OperatingSystemDto {
	family: string;
	bitness: number;
	versionInfo: VersionInfo;
	systemboottime: string;
}

export interface GlobalMemoryDto {
	availableMemory: string;
	usedMemory: string;
	totalMemory: string;
	virtualUsedMemory: string;
	virtuallMemory: string;
	percentage: number;
	ramTypeOrOsBitDepth: string;
	procCount: string;
}

export interface PowerDto {
	name: string;
	deviceName: string;
	voltage: string;
	powerOnLine: boolean;
	charging: boolean;
	discharging: boolean;
	currentCapacity: number;
	maxCapacity: number;
	designCapacity: number;
	chemistry: string;
	manufacturer: string;
}

export interface StorageDtoList {
	mainStorage: string;
	total: string;
	diskCount: string;
	usedRate: string;
}

export interface GraphicsCardList {
	name: string;
	deviceId: string;
	vendor: string;
	versionInfo: string;
	vram: number;
}

export interface GraphicsCardDto {
	graphicsCardList: GraphicsCardList[];
}

export interface System {
	computerSystemDto: ComputerSystemDto;
	processorDto: ProcessorDto;
	operatingSystemDto: OperatingSystemDto;
	globalMemoryDto: GlobalMemoryDto;
	powerDto: PowerDto;
	storageDtoList: StorageDtoList[];
	graphicsCardDto: GraphicsCardDto;
}
