import { Grid3x3 } from 'lucide-react-native';
import type { CourseModule } from '../types/course';

export const computerVisionCourse: CourseModule = {
  id: 'computer-vision',
  title: 'Computer Vision',
  subtitle: 'Images, CNNs, detection, segmentation, multimodal AI',
  color: '#C84D3A',
  accent: '#FBE7E3',
  Icon: Grid3x3,
  history: {
    founder: 'David Marr, Kunihiko Fukushima, Yann LeCun, and the vision research community',
    released: '1960s foundations, deep vision boom from 2012',
    summary:
      'Computer vision teaches machines to interpret images and video. It powers medical imaging, self-driving perception, OCR, quality inspection, face analysis, and multimodal AI systems.',
  },
  concepts: [
    'Pixels, channels, image tensors',
    'Filters, edges, kernels, and convolution',
    'Pooling, feature maps, and receptive fields',
    'CNN architectures: LeNet, AlexNet, ResNet',
    'Image classification and transfer learning',
    'Object detection: boxes, IoU, mAP',
    'Segmentation: semantic and instance masks',
    'Vision transformers and multimodal AI',
  ],
  lessons: [
    {
      id: 'cv-image-tensors',
      title: 'Images as Tensors',
      duration: '22 min',
      objective: 'Understand how images become numeric arrays for AI models.',
      blocks: [
        { type: 'heading', text: 'Images Are Numbers' },
        {
          type: 'paragraph',
          text: 'A digital image is a grid of pixel values. Grayscale images are usually height x width. Color images add channels, usually red, green, and blue, so the tensor becomes height x width x 3.',
        },
        {
          type: 'table',
          headers: ['Image Type', 'Shape', 'Meaning'],
          rows: [
            ['Grayscale', 'H x W', 'One intensity value per pixel'],
            ['RGB', 'H x W x 3', 'Red, green, blue channels'],
            ['Batch', 'N x H x W x C', 'Many images together'],
          ],
        },
        {
          type: 'playground',
          code: 'import numpy as np\nimage = np.zeros((28, 28, 3))\nprint(f"Height: {image.shape[0]}")\nprint(f"Width: {image.shape[1]}")\nprint(f"Channels: {image.shape[2]}")',
          expectedOutput: 'Height: 28\nWidth: 28\nChannels: 3',
        },
      ],
    },
    {
      id: 'cv-convolution',
      title: 'Convolutions and CNNs',
      duration: '28 min',
      objective: 'Learn how filters detect visual patterns.',
      blocks: [
        { type: 'heading', text: 'The Convolution Idea' },
        {
          type: 'paragraph',
          text: 'A convolution slides a small matrix called a kernel across an image. Early filters detect edges and corners. Deeper layers combine them into textures, parts, and full objects.',
        },
        {
          type: 'diagram',
          title: 'CNN Feature Hierarchy',
          boxes: [
            { id: 'pixels', x: 10, y: 65, width: 70, height: 44, label: 'Pixels', color: '#2B6CB0' },
            { id: 'edges', x: 98, y: 65, width: 70, height: 44, label: 'Edges', color: '#C84D3A' },
            { id: 'parts', x: 186, y: 65, width: 70, height: 44, label: 'Parts', color: '#1D7A57' },
            { id: 'object', x: 274, y: 65, width: 70, height: 44, label: 'Object', color: '#7454C4' },
          ],
          arrows: [
            { from: 'pixels', to: 'edges' },
            { from: 'edges', to: 'parts' },
            { from: 'parts', to: 'object' },
          ],
          height: 170,
        },
        {
          type: 'callout',
          variant: 'remember',
          title: 'Why CNNs Work',
          body: 'CNNs reuse the same filters across the image, so they learn patterns no matter where they appear.',
        },
      ],
    },
    {
      id: 'cv-detection-segmentation',
      title: 'Detection and Segmentation',
      duration: '26 min',
      objective: 'Understand object localization and pixel-level prediction.',
      blocks: [
        { type: 'heading', text: 'Beyond Classification' },
        {
          type: 'paragraph',
          text: 'Classification says what is in an image. Detection says what and where using bounding boxes. Segmentation labels pixels, which is essential for medical scans, robotics, and autonomous driving.',
        },
        {
          type: 'table',
          headers: ['Task', 'Output', 'Metric'],
          rows: [
            ['Classification', 'Class label', 'Accuracy, F1'],
            ['Detection', 'Boxes and labels', 'IoU, mAP'],
            ['Segmentation', 'Pixel masks', 'IoU, Dice score'],
          ],
        },
        {
          type: 'bullets',
          items: [
            'IoU measures overlap between predicted and true boxes.',
            'mAP summarizes detection quality across confidence thresholds.',
            'Segmentation needs careful annotation and strong evaluation.',
          ],
        },
      ],
    },
  ],
  quiz: [
    { id: 'cv-q1', prompt: 'What shape is common for an RGB image?', options: ['H x W x 3', '3 only', 'N only', 'Text tokens'], answerIndex: 0, explanation: 'RGB images usually have height, width, and three color channels.' },
    { id: 'cv-q2', prompt: 'What does a convolution kernel do?', options: ['Slides across an image to detect patterns', 'Deletes labels', 'Creates a database', 'Runs only text prompts'], answerIndex: 0, explanation: 'Kernels detect local visual patterns such as edges.' },
    { id: 'cv-q3', prompt: 'Which task predicts bounding boxes?', options: ['Object detection', 'Regression only', 'Tokenization', 'Clustering only'], answerIndex: 0, explanation: 'Object detection predicts object classes and locations.' },
  ],
  practice: [
    { id: 'cv-p1', title: 'Image Shape', prompt: 'Print the channel count of an RGB image array.', starterCode: 'shape = (224, 224, 3)\n# Your code here:', expectedOutput: 'Channels: 3', hint: 'The channel count is shape[2].' },
    { id: 'cv-p2', title: 'IoU Thinking', prompt: 'Print whether IoU 0.7 is a good overlap if threshold is 0.5.', starterCode: 'iou = 0.7\nthreshold = 0.5\n# Your code here:', expectedOutput: 'Good overlap: True', hint: 'Compare iou >= threshold.' },
  ],
};
