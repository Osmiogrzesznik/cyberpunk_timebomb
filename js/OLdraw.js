//-
var doNotsetPropertyOfSelectedOrLastFeatures_Color = false;
      var featureCounter = 0;
      var lastFeature;
      //   import Map from 'ol/Map.js';
      //   import View from 'ol/View.js';
      //   import Draw from 'ol/interaction/Draw.js';
      //   import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer.js';
      //   import {OSM, Vector as VectorSource} from 'ol/source.js';
      var defaultStroke = new ol.style.Stroke({
        color: [128, 255, 128],
        width: 2
      });
      var DEFAULT_STROKE_WIDTH = 2;
      var STROKE_WIDTH_SELECTED = 4;
      var DEFAULT_FILL_OPACITY = 0.2;
      var DEFAULT_STROKE_COLOR = [128, 255, 128];

      function NuDefaultPointCircleImage(color) {
        return new ol.style.Circle({
          radius: 7,
          stroke: new ol.style.Stroke({
            color: color,
            width: DEFAULT_STROKE_WIDTH
          }),
          fill: new ol.style.Fill({
            color: color.concat(DEFAULT_FILL_OPACITY)
          }),
        })
      }


      var defaultDrawnTextStyle = new ol.style.Text({
        text: "Untitled MapObject",
        font: " 9px joystix",
        stroke: new ol.style.Stroke({
          width: DEFAULT_STROKE_WIDTH,
          color: [0, 0, 0, 0.8],
        }),
        fill: new ol.style.Fill({
          color: DEFAULT_STROKE_COLOR
        })
      });
      var defaultDrawnStyleOptions = {
        text: defaultDrawnTextStyle,
        image: new ol.style.Circle({
          radius: 7,
          stroke: new ol.style.Stroke({
            color: DEFAULT_STROKE_COLOR,
            width: DEFAULT_STROKE_WIDTH
          }),
          fill: new ol.style.Fill({
            color: DEFAULT_STROKE_COLOR.concat(DEFAULT_FILL_OPACITY)
          }),
        }),
        stroke: new ol.style.Stroke({
          color: DEFAULT_STROKE_COLOR,
          width: DEFAULT_STROKE_WIDTH
        }),
        fill: new ol.style.Fill({
          color: DEFAULT_STROKE_COLOR.concat(DEFAULT_FILL_OPACITY)
        }),
      }
      var defaultDrawnPointImage = new ol.style.Circle({
        radius: 7,
        stroke: new ol.style.Stroke({
          color: DEFAULT_STROKE_COLOR,
          width: DEFAULT_STROKE_WIDTH
        }),
        fill: new ol.style.Fill({
          color: DEFAULT_STROKE_COLOR.concat(DEFAULT_FILL_OPACITY)
        }),
      })

      var defaultStyle = new ol.style.Style(defaultDrawnStyleOptions);
      var lastStyle = defaultStyle.clone();
      var allPreviouslyDrawnFeaturesArray = [];
      var allDrawnFeaturesCollection = new ol.Collection(allPreviouslyDrawnFeaturesArray, {
        unique: true
      })

      var tileLayer = new ol.layer.Tile({
        source: new ol.source.OSM({
          url: "https://cartodb-basemaps-b.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
        })
      });


      //--------------------------------

      var drawnFeaturesSource = new ol.source.Vector({
        features: allDrawnFeaturesCollection,
        wrapX: false
      });



      var drawnVectorLayer = new ol.layer.Vector({
        source: drawnFeaturesSource
      });
      drawnVectorLayer.set("isDrawingLayer", true);

      // ----------------------------------
      /**
       * interactions
       * */

      snap = new ol.interaction.Snap({
        source: drawnFeaturesSource,
        //features: allDrawnFeaturesCollection
      });

      var selectToDeleteInteraction = new ol.interaction.Select({
        source: drawnFeaturesSource,
        layers: x => x.get('isDrawingLayer'), //filter function - selecting only from drawing layer
        //features: allDrawnFeaturesCollection
      });

      var selectToEditInteraction = new ol.interaction.Select({
        // source: drawnFeaturesSource,
        layers: x => x.get('isDrawingLayer'), //filter function - selecting only from drawing layer
        //features: allDrawnFeaturesCollection
      });


      /**
       * SELECTTOEDTI HADLER
       * 
       * */
      selectToEditInteraction.on("select", ev => {
        //--SETS THE INPUT VALUES TO THE 
        //STYLE OF CURRENTLY SELECTED FEATURE OR lAST EDITED fEATURE 
        //todo: enclose in separate function
        //-----------------------------------------------------------
        if (ev.selected.length) {
          lastFeature = ev.selected[
            0]; //IF USER SELECTs NEW FEATURE IT WILL BECOME TARGET OF STYLE INTEREST
        }
        let lfs = lastFeature.getStyle() || defaultStyle;
        ccc = lfs.getStroke().getColor() || DEFAULT_STROKE_COLOR;
        console.log(ccc)
        jscolorInput.jscolor.fromRGB(ccc[0], ccc[1], ccc[2]);
        featureNameInput.value = lfs.getText().getText() || "";
        //----------------------------------------------------------------
        ed = ev;
        edel = selectToEditInteraction
          .getFeatures()
          .getArray()
          .map(x => x.getProperties().id)

        lll("selectToEditInteraction.getFeatures() ids:" + edel
          .join(",")
        )
        //       lll("selection event")	
        ev.deselected.forEach(feat => { //this works slow
          //let feat = ev.deselected[0];
          //you can stylize differently last selected item
          feat.getStyle().getStroke().setWidth(DEFAULT_STROKE_WIDTH);
          feat.getStyle().getStroke().setLineDash([]);
          feat.changed();
          lll("deselected no " + feat.get('id'))
        });

        if (ev.selected.length > 1) {
          lll('multiple selected');
        }

        ev.selected.forEach(feat => {
          feat.getStyle().getStroke().setLineDash([5, 5]);
          feat.getStyle().getStroke().setWidth(STROKE_WIDTH_SELECTED);
          feat.changed();
          lll("selected no " + feat.get('id'));
        })

        //change bar name to something that indicates there is 
        //selection going on
      })

      function setPropertyOfSelectedOrLastFeatures_Color(jscolorpicker) {
        lll("updating color style" + jscolorpicker.toHEXString());
        let selectedFeatures = selectToEditInteraction.getFeatures().getArray()
        if (!selectedFeatures.length) {
          // if no features selected apply changes to array made of last edited element
          selectedFeatures = lastFeature ? [lastFeature] : [];
        }

        if (window.lastFeature && lastFeature.getStyle()) {
          lastStyle = lastFeature.getStyle().clone();
        } else if (!window.lastStyle) {
          lastStyle = defaultStyle.clone();
        }

        c = jscolorpicker.rgb;
        lastStyle.getStroke().setColor(c);
        lastStyle.getFill().setColor([c[0], c[1], c[2], DEFAULT_FILL_OPACITY]);
        // lastStyle.getText().getStroke().setColor("black")
        lastStyle.getText().getFill().setColor(c);
        lastStyle.getStroke().setWidth(DEFAULT_STROKE_WIDTH);

        selectedFeatures.forEach(feat => {
          if (feat.getGeometry().getType() === "Point") {
            circleImage = NuDefaultPointCircleImage(c);
            lastStyle.setImage(circleImage);
          }

          lastFeature.setStyle(lastStyle.clone());
          lastFeature.set("color", c)
        })

        jscolorpicker.hide();
        map.getTargetElement().focus({
          preventScroll: true
        }); // cant do this - moves the brwoser view
      }

      function setPropertyOfSelectedOrLastFeatures_Name(input) {
        lll("updating text style")
        niuname = input.value;

        //this part is the same  factor it out ?
        let selectedFeatures = selectToEditInteraction.getFeatures().getArray()
        if (!selectedFeatures.length) {
          // if no features selected apply changes to array made of last edited element
          selectedFeatures = lastFeature ? [lastFeature] : [];
        }

        if (window.lastFeature && lastFeature.getStyle()) {
          lastStyle = lastFeature.getStyle().clone();
        } else if (!window.lastStyle) {
          lastStyle = defaultStyle.clone();
        }


        var textStyle = defaultDrawnTextStyle.clone();
        textStyle.setText(niuname);
        textStyle.getFill().setColor(lastStyle.getStroke().getColor());
        lastStyle.setText(textStyle.clone()); // will all features below have the same object as their text?
        ///check!!! should you use smth like 
        //let feattextstyle = textStyle.clone(); 
        lastStyle.getStroke().setWidth(DEFAULT_STROKE_WIDTH);

        selectedFeatures.forEach(feat => {
          feat.set("name", niuname);
          feat.setStyle(lastStyle.clone());
        })


        input.blur();
        map.getTargetElement().focus({
          preventScroll: true
        });
      }

      /*
      		       selectInteraction.getFeatures().on("add", function (e) {
                      // do something. e.element is the feature which was added
                      props = e.element.getProperties();
                      console.log("added", props);
                      lastFeature = e.element;
                      currentselection = selectInteraction.getFeatures().getArray();
                      console.log("current selection : ", currentselection);
                  });
      */

      var modifyInteraction = new ol.interaction.Modify({
        features: selectToEditInteraction.getFeatures(),
      });

      modifyInteraction.on("modifystart", ev => {
        ed = ev;
        console.log("starting modification")
      })
      modifyInteraction.on("modifyend", ev => {
        ed = ev;
        console.log("ending modification")
      })

      var map = new ol.Map({
        layers: [tileLayer, drawnVectorLayer],
        target: 'map',
        moveTolerance: 10,
        view: new ol.View({
          center: [-11000000, 4600000],
          zoom: 4
        })
      });

      var typeSelect = document.getElementById('type');

      // map.addInteraction(modifyInteraction);

      var draw; // global so we can remove it later



      function addInteractions(newMode) {
        map.set("current_mode", newMode);
        lastStyle = window.lastFeature ? lastFeature.getStyle().clone() : defaultStyle.clone();
        lastStyle.getStroke().setWidth(DEFAULT_STROKE_WIDTH);
        lastStyle.getStroke().setLineDash([]);
        window.lastFeature ? lastFeature.setStyle(lastStyle) : 0; //prevents dash line remain
        map.getTargetElement().focus({
          preventScroll: true
        });;
        map.removeInteraction(snap);
        selectToEditInteraction.getFeatures().clear();
        selectToDeleteInteraction.getFeatures().clear();


        settings = {
          source: drawnFeaturesSource,
          //features: allDrawnFeaturesCollection,
          type: newMode,
        }

        switch (newMode) {
          case 'SelectAndDelete':
            // do nothing 
            map.addInteraction(snap)
            map.addInteraction(selectToDeleteInteraction);
            selectToDeleteInteraction.on("select", deleteFeature);
            break;

          case 'SelectAndEdit':
            // do nothing 
            map.addInteraction(selectToEditInteraction);
            map.addInteraction(modifyInteraction);

            //selectInteraction.getFeatures().on("add",x=>{lastFeature=x.element})

            break;

          case 'Point':
            settings.style = null;
            //continues to default
          default:
            draw = new ol.interaction.Draw(settings);
            map.addInteraction(draw);
            /*     snap = new ol.interaction.Snap({
                            source: drawnFeaturesSource,
                            features: allDrawnFeaturesCollection
                        });
*/

            draw.on("drawstart", ev => {
              lastStyle.getStroke().setWidth(DEFAULT_STROKE_WIDTH);
              lastStyle.getStroke().setLineDash([]);
              console.log("starting drawing")

            })
            draw.on("drawend", (event) => {
              console.log("ending drawing")
              //rememberLastEditedFeature(event)
              featureCounter++;
              lastFeature = event.feature;
              currentStyle = window.lastStyle ? lastStyle.clone() : defaultStyle.clone();
              color = currentStyle.getStroke().getColor();
              featureID = featureCounter;
              name = featureNameInput.value || "Untitled " + featureID;
              event.feature.setProperties({
                'id': featureID,
                'name': name,
                'color': color,
              });
              currentStyle.getText().setText(name); //this
              lastFeature.setStyle(currentStyle);
              lastFeature.getStyle().getText().setText(name); //and this is redundant ?
            })

            map.addInteraction(snap);
            break;

        }



        //map.addInteraction(selectInteraction);

      }

      function selectAll(ev, kbl) {
        lll("selecting all");
        return true;
      }

      function deleteFeature2(event) {
        lll("deleting");
        return true;
      }

      var KeyboardListeners = {
        keyUp(event) {
          changed = this.setKeyVal(event.key, false);
          lll('kEYuP' + (changed ? " changed " : "left ") + event.key + " being" + this.isPressed(event
            .key));
          if (changed && this.onKeyUpHandlers.hasOwnProperty(event.key)) {
            lll("trying to run handler")
            handlerRan = this.onKeyUpHandlers[event.key](event, this);
            lll("handlerRan" + handlerRan);
          }
        },
        keyDown(event) {
          this.setKeyVal(event.key, true);
          lll('KEYDOWN' + (changed ? " changed " : "left ") + event.key + " being" + this.isPressed(event
            .key));
          if (changed && this.onKeyDownHandlers.hasOwnProperty(event.key)) {
            lll("trying to run handler")
            handlerRan = this.onKeyDownHandlers[event.key](event, this);
            lll("handlerRan" + handlerRan);
          }
        },
        addOnKeysDown(combinationArray, listenerFunc) {
          throw new Error("not implemented yet");
          // combinationArray.forEach(keyname=>{
          //     this.setKeyVal(keyName,false); // prepare keys to be listened for(not exactly needed as they are added automatically)

          // });
          // let lastkey = combinationArray[combinationArray.length-1];
          // this.onKeyDow
          // throw new Error("not implemented yet");
          // map.getTargetElement().addEventListener("keydown", keyDownListener);
          // map.getTargetElement().addEventListener("keyup", keyUpListener);
        },
        addOnKeysUp(combinationArray, listenerFunc) {
          throw new Error("not implemented yet");
        },
        onKeyUpHandlers: {},
        onKeyDownHandlers: {
          Delete: (e, t) => deleteFeature2(e, t),
          a: (e, t) => {
            e.preventDefault();
            return t.isPressed("Control") && selectAll(e, t);
          },
          Escape: (e, t) => {
            if (map.get("current_mode") === "Circle") {
              draw.setActive(false);
              draw.setActive(true);
            }
            draw.removeLastPoint();
          }
        },
        setKeyVal(key, booly) {
          changed = (this.keyVals[key] !== booly)
          this.keyVals[key] = booly;
          return changed;
        },
        isPressed(key) {
          return this.keyVals[key];
        },
        keyVals: {}, //this is flags container , it will fill with key:boolean pairs indicating whether button is pressed or not
      }

      function keyDownListener(event) {
        KeyboardListeners.keyDown(event);
        //console.log(event.key + " DOWN " + event.keyCode);
      }

      function keyUpListener(event) {

        KeyboardListeners.keyUp(event);
        //console.log(event.key + " up " + event.keyCode);
      }
      map.getTargetElement().addEventListener("keydown", keyDownListener);
      map.getTargetElement().addEventListener("keyup", keyUpListener);





      function deleteFeature(event) {
        ed = event;
        let featuresToDelete = [];
        switch (event.type) {
          case "select":
            say("selection event", 1);
            if (!event.selected.length) {
              alert("deselected");
              return;
            }
            featuresToDelete = event.selected;
            break;
          case "add":
            featuresToDelete = [event.element];
            break;
          case "keydown":
            //check if there are some features selected
            if (selectToEditInteraction.getFeatures().getLength()) {
              featuresToDelete =
                selectToEditInteraction.getFeatures();
            } else if (window.lastFeature) {
              //else target of deletion will be last clicked/drawn feature
              featuresToDelete = [lastFeature];
            } else {
              //else delete nothing
              featuresToDelete = [];
            }
            default:
              break;
        }
        featuresToDelete.forEach(feat => {
          console.log("deleting no" + feat.get("id") + " name:" + feat.get("name"));
          drawnFeaturesSource.removeFeature(feat);
          allDrawnFeaturesCollection.remove(feat);
        })
        selectToEditInteraction.getFeatures().clear();
        selectToDeleteInteraction.getFeatures().clear();
      }


      /**
       * Handle change event.
       */
      function drawingModeChange(newDrawingModeName) {
        map.removeInteraction(draw);
        map.removeInteraction(snap);
        map.removeInteraction(modifyInteraction)
        map.removeInteraction(selectToEditInteraction);
        map.removeInteraction(selectToDeleteInteraction);
        addInteractions(newDrawingModeName);
      };


      function saveDrawnFeatures() {
        feats = drawnFeaturesSource.getFeatures(); //.getArray();
        g = new ol.format.GeoJSON();
        ret = [];
        feats.forEach(feat => {
          let o = {};
          o.color = feat.get("color").map(x => ~~x);
          o.name = feat.get("name");
          o.id = feat.get("id");
          if (feat.getGeometry().getType() === "Circle") {
            o.type = "Circle";
            let gm = feat.getGeometry();
            o.radius = gm.getRadius(); //remeber to use setRadius() not use options radius?
            o.center = gm.getCenter();
          }
          feat.setProperties(o);
          jsonifiedfeat = g.writeFeature(feat);
          ret.push(jsonifiedfeat);
        });

        retjson = "[" + ret.join(",") + "]";
        say(retjson).asNormal();
        fetch("test.php?savedrawnfeatures", {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            // mode: 'cors', // no-cors, cors, *same-origin
            // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'include', // include, *same-origin, omit
            // headers: {
            'Content-Type': 'application/json',
            //       'Content-Type': 'application/x-www-form-urlencoded'
            // },
            //redirect: 'manual', // manual, *follow, error
            // referrer: 'no-referrer', // no-referrer, *client
            body: retjson // body data type must match "Content-Type" header
          })
          .then(response => response.text())
          .then(t => {
            try {
              say("response came");
              say(t);
              let j = JSON.parse(t);
              say(j.received);


            } catch (err) {
              say(err);
              say(t);
            }
            // confirm("if device added succesfully , click ok to refresh window"+t)?
            // window.open(baseurl,"_self"):0; //try to display modal else say

          })
          .catch(err => say(err));; // parses JSON response into native JavaScript objects 
        return false; //false;//return false to prevent form from reloading the page   
      }




      function loadDrawnFeatures() {

        if (!confirm("load features?")) return;
        fetch("test.php")
          .then(response => response.text())
          .then(t => {
            try {
              say("response came");
              say(t);
              let j = JSON.parse(t);
              say("decoded response");
              
              loadFeatures(j.features)
            } catch (err) {
              say(err);
              say(t);
              alert(err);
              console.warn(err);
              throw err;
            }
            // confirm("if device added succesfully , click ok to refresh window"+t)?
            // window.open(baseurl,"_self"):0; //try to display modal else say

          })
          .catch(err => {
            alert(err);
            say(err);
            throw err;
          }); // parses JSON response into native JavaScript objects 
        return false; //false;//return false to prevent form from reloading the page   
      }


      function loadFeatures(j) {
        if (!j.length){
          say("no saved features to show");
          return;
        }
        window.j = j;
        g = new ol.format.GeoJSON();
        //if (!confirm("Received response.sure to start loading features?")) return;
        j.forEach(f => {
          if (f.properties.type === "Circle") {
            alert("circle", 1);
            feat = new ol.Feature(
              new ol.geom.Circle(
                f.properties.center,
                f.properties.radius))
            feat.setProperties(f.properties);
          } else {
            feat = g.readFeature(f);
          }
          let currentStyle = defaultStyle.clone();
          color = f.properties.color;
          name = f
            .properties.name;
          featureCounter = f.properties.id;
          currentStyle.getText()
            .setText(name); //this
          currentStyle.getText().getFill().setColor(color);
          currentStyle.getStroke().setColor(color);
          currentStyle.getFill().setColor(color
            .concat([DEFAULT_FILL_OPACITY]));
          currentStyle.setImage(NuDefaultPointCircleImage(color));
          feat.setStyle(currentStyle);
          feat.getStyle().getText().setText(name); //and this is redundant ?
          alert("\n feature loaded " + JSON.stringify({
            color: feat.getStyle().getStroke().getColor(),
            name: feat.getStyle().getText().getText(),
          }));
          drawnFeaturesSource.addFeature(feat);

        });

      }



     
      rad = document.querySelectorAll(".radio-map-mode-input");
      for (var i = 0; i < rad.length; i++) {
        rad[i].addEventListener('change', function (ev) {
          drawingModeChange(this.value);
        });
      }
      // window.addEventListener("load", x => say("finished loading"));
      drawingModeChange("Circle");
      loadDrawnFeatures();
      map.getTargetElement().focus({
        preventScroll: true
      });