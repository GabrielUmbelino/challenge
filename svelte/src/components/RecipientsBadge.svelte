<script lang="ts">
  export let numTruncated: number
</script>

<span class="badge" data-testid="badge">
  +{numTruncated}
</span>

<style lang="scss">
  @use '../styles/variables';

  .badge {
    padding: 2px 5px;
    border-radius: 3px;
    background-color: variables.$color-primary;
    color: #f0f0f0;
  }
</style>
