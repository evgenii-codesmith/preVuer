<template>

  <div id="center-canvas">
    <v-stage ref="stage" :config="stageConfig" @mousedown="handleStageMouseDown">
    <v-layer ref="imageLayer">
      <v-image :config="{
            image: image
          }"/>
    </v-layer>
    <v-layer ref="layer">
      <v-rect
        v-for="rect in rectangles"
        :key="rect.id"
        :config="rect"
        @mouseover="onMouseOver"
        @mouseout="onMouseOut"
      ></v-rect>

      <v-transformer ref="transformer" :config="trConfig"></v-transformer>
    </v-layer>
  </v-stage>
  </div>
</template>

<script>
export default {
  name: 'center-canvas',
  data() {
    return {
      stageConfig: {
        width: window.innerWidth,
        height: window.innerHeight,
      },
      trConfig: {
        rotateEnabled: false,
      },
      selectedRectId: '',
      image: null,
    };
  },
  methods: {
    onMouseOver() {
      document.body.style.cursor = 'grabbing';
    },
    onMouseOut() {
      document.body.style.cursor = 'default';
    },
    handleStageMouseDown(e) {
      
      // Clicked on the stage -> Clear Transformer Selection
      if (e.target === e.target.getStage()) {
        this.selectedRectId = '';
        this.updateTransformer();
        // eslint-disable-next-line no-useless-return
        return;
      }

      // Clicked on transformer -> Do nothing
      if (e.target.getParent().className === 'Transformer') {
        // eslint-disable-next-line no-useless-return
        return;
      }

      // Find Clicked Rectangle by its id
      const id = e.target.id();
      const rect = this.rectangles.find(el => el.id === id);
        
      if (rect) {
        this.selectedRectId = id;
      } else {
        this.selectedRectId = '';
      }

      this.updateTransformer();
    },
    updateTransformer() {
      const transformerNode = this.$refs.transformer.getStage(); // Get transfomer
      const stage = transformerNode.getStage(); // Get stage
      const { selectedRectId } = this;

      const selectedNode = stage.findOne('#' + selectedRectId); // Get selected node

      // Do nothing if transfomer already attached to rectangle
      if (selectedNode === transformerNode.node()) { 
      // eslint-disable-next-line no-useless-return
        return;
      }

      // Bind transfomer to a selected rectangle if it is not attached
      if (selectedNode) {
        transformerNode.attachTo(selectedNode);
      } else {
        // Remove Transformer if clicked on stage and not on a rectangle
        transformerNode.detach();
      }
      transformerNode.getLayer().batchDraw();
    },
  },
   computed: {
     rectangles(){
       return this.$store.state.components
     }
   }

};

</script>

<style>

</style>

