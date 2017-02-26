import "babel-polyfill";
import $ from "../libs/jquery";
import as from "../libs/as";
import sortable from "../libs/sortable";

class Column extends as.View {
    constructor(el, columnName="Column"){
        super(el);
        this.columnName = columnName;
        this.renderColumn();

        this.addListener("updateColumnCounter", ".task-list", this.updateCounter);
    }

    renderColumn() {
        if (!this.el.find(".column-heading").length){
            this.el.append(`
                <h2 class="column-heading">${this.columnName} : <span class="projects-counter">0</span></h1>
                <ul class="task-list">
                </ul>
            `);
        }
        this.tasksInColumnCounter = this.$(".projects-counter");
        this.makeTasksDraggable();
    }

    makeTasksDraggable() {
        sortable.create(this.el.find(".task-list")[0], { 
            group:"columns",
            animation: 100,
            ghostClass: "is-ghost",
            onAdd: function (event) {
                $("."+event.from.className).trigger("updateColumnCounter");
                $("."+event.to.className).trigger("updateColumnCounter");
            },
        });
    }

    updateCounter() {
        this.tasksInColumnCounter.text(this.$(".task").length);
    }
}

export default Column;