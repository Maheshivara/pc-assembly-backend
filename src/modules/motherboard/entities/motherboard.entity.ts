import { ApiProperty } from '@nestjs/swagger';

export class Motherboard {
  @ApiProperty({ description: 'Motherboard name' })
  name?: string;

  @ApiProperty({ description: 'Brand of the motherboard' })
  brand?: string;

  @ApiProperty({ description: 'Manufacturer Part Number' })
  mpn: string;

  @ApiProperty({ description: 'EAN code' })
  ean?: string;

  @ApiProperty({ description: 'UPC code' })
  upc?: string;

  @ApiProperty({ description: 'CPU socket type' })
  socket?: string;

  @ApiProperty({ description: 'Chipset model' })
  chipset?: string;

  @ApiProperty({
    description: 'Form factor of the motherboard',
  })
  formFactor?: string;

  @ApiProperty({
    description: 'Supported memory type',
  })
  memoryType?: string;

  @ApiProperty({
    type: Number,
    description: 'Maximum memory capacity (in GB)',
  })
  memoryCapacity?: number;

  @ApiProperty({
    type: Number,
    description: 'Number of memory slots',
  })
  memorySlots?: number;

  @ApiProperty({ description: 'Supported memory speed' })
  memorySpeed?: string;

  @ApiProperty({
    type: Number,
    description: 'Number of SATA slots',
  })
  sataSlots?: number;

  @ApiProperty({
    type: Number,
    description: 'Number of M.2 PCIe 3.0 slots',
  })
  m2PCI3Slots?: number;

  @ApiProperty({
    type: Number,
    description: 'Number of M.2 PCIe 4.0 slots',
  })
  m2PCI4Slots?: number;

  @ApiProperty({
    type: Number,
    description: 'Number of PCIe 3.0 x1 extension slots',
  })
  extensionPCI3x1?: number;

  @ApiProperty({
    type: Number,
    description: 'Number of PCIe 3.0 x4 extension slots',
  })
  extensionPCI3x4?: number;

  @ApiProperty({
    type: Number,
    description: 'Number of PCIe 3.0 x8 extension slots',
  })
  extensionPCI3x8?: number;

  @ApiProperty({
    type: Number,
    description: 'Number of PCIe 3.0 x16 extension slots',
  })
  extensionPCI3x16?: number;

  @ApiProperty({
    type: Number,
    description: 'Number of PCIe 4.0 x1 extension slots',
  })
  extensionPCI4x1?: number;

  @ApiProperty({
    type: Number,
    description: 'Number of PCIe 4.0 x4 extension slots',
  })
  extensionPCI4x4?: number;

  @ApiProperty({
    type: Number,
    description: 'Number of PCIe 4.0 x8 extension slots',
  })
  extensionPCI4x8?: number;

  @ApiProperty({
    type: Number,
    description: 'Number of PCIe 4.0 x16 extension slots',
  })
  extensionPCI4x16?: number;

  @ApiProperty({
    type: Number,
    description: 'Number of USB 3.0 slots',
  })
  usb3Slots?: number;

  @ApiProperty({
    type: Number,
    description: 'Number of USB 3.0 headers',
  })
  usb3Headers?: number;

  @ApiProperty({
    type: Number,
    description: 'Number of USB 3.0 Type-C slots',
  })
  usb3CSlots?: number;

  @ApiProperty({
    type: Number,
    description: 'Number of VGA ports',
  })
  vga?: number;

  @ApiProperty({
    type: Number,
    description: 'Number of DVI ports',
  })
  dvi?: number;

  @ApiProperty({
    type: Number,
    description: 'Number of DisplayPort ports',
  })
  dp?: number;

  @ApiProperty({
    type: Number,
    description: 'Number of HDMI ports',
  })
  hdmi?: number;

  @ApiProperty({ description: 'Wi-Fi support details' })
  wifi?: string;

  @ApiProperty({ description: 'Integrated graphics details' })
  graphics?: string;

  @ApiProperty({ description: 'Image URL' })
  imageUrl?: string;

  @ApiProperty({ description: 'Product page URL' })
  productUrl?: string;

  constructor(
    mpn: string,
    name?: string,
    brand?: string,
    ean?: string,
    upc?: string,
    socket?: string,
    chipset?: string,
    formFactor?: string,
    memoryType?: string,
    memoryCapacity?: number,
    memorySlots?: number,
    memorySpeed?: string,
    sataSlots?: number,
    m2PCI3Slots?: number,
    m2PCI4Slots?: number,
    extensionPCI3x1?: number,
    extensionPCI3x4?: number,
    extensionPCI3x8?: number,
    extensionPCI3x16?: number,
    extensionPCI4x1?: number,
    extensionPCI4x4?: number,
    extensionPCI4x8?: number,
    extensionPCI4x16?: number,
    usb3Slots?: number,
    usb3Headers?: number,
    usb3CSlots?: number,
    vga?: number,
    dvi?: number,
    dp?: number,
    hdmi?: number,
    wifi?: string,
    graphics?: string,
    imageUrl?: string,
    productUrl?: string,
  ) {
    this.name = name;
    this.brand = brand;
    this.mpn = mpn;
    this.ean = ean;
    this.upc = upc;
    this.socket = socket;
    this.chipset = chipset;
    this.formFactor = formFactor;
    this.memoryType = memoryType;
    this.memoryCapacity = memoryCapacity;
    this.memorySlots = memorySlots;
    this.memorySpeed = memorySpeed;
    this.sataSlots = sataSlots;
    this.m2PCI3Slots = m2PCI3Slots;
    this.m2PCI4Slots = m2PCI4Slots;
    this.extensionPCI3x1 = extensionPCI3x1;
    this.extensionPCI3x4 = extensionPCI3x4;
    this.extensionPCI3x8 = extensionPCI3x8;
    this.extensionPCI3x16 = extensionPCI3x16;
    this.extensionPCI4x1 = extensionPCI4x1;
    this.extensionPCI4x4 = extensionPCI4x4;
    this.extensionPCI4x8 = extensionPCI4x8;
    this.extensionPCI4x16 = extensionPCI4x16;
    this.usb3Slots = usb3Slots;
    this.usb3Headers = usb3Headers;
    this.usb3CSlots = usb3CSlots;
    this.vga = vga;
    this.dvi = dvi;
    this.dp = dp;
    this.hdmi = hdmi;
    this.wifi = wifi;
    this.graphics = graphics;
    this.imageUrl = imageUrl;
    this.productUrl = productUrl;
  }
}
