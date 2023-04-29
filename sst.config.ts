import { SSTConfig } from 'sst';
import { Bucket, NextjsSite } from 'sst/constructs';

export default {
  config(_input) {
    return {
      name: 'open-next-deployment',
      region: 'us-east-1',
    };
  },
  stacks(app) {
    app.stack(function Site({ stack }) {
      const s3Bucket = new Bucket(stack, 'public', {
        cors: true,
      });
      const site = new NextjsSite(stack, 'site', {
        bind: [s3Bucket],
      });

      stack.addOutputs({
        SiteUrl: site.url,
      });
    });
  },
} satisfies SSTConfig;
