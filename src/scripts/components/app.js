import "babel-polyfill";
import as from "../libs/as";
import $ from "../libs/jquery";
import Column from "../components/column";


class App extends as.View {
    constructor(el){
        super(el);

        this.addTaskInput = this.$(".input-field");
        this.main = this.$(".main");
        this.totalTasksDisplay = this.$(".header-title .projects-counter");
        
        this.tasksNumber = 0;
        this.initialColumnsNames = ["To do", "In progress", "Done"];

        this.initializeDefaultColumns();
        this.addListener("submit", ".new-task-wrapper", this.addTask);
    }

    addTask(e) {
        e.preventDefault();
        const taskName = this.addTaskInput.val();
        this.firstColumnTasks.append(`
            <li class="task" draggable="true">
				<h3 class="task-heading">${taskName}</h3>
			</li>
        `);
        this.increaseTasksCount();
        this.firstColumnTasks.trigger("updateColumnCounter");
        this.addTaskInput.val("");
    }

    increaseTasksCount() {
        this.tasksNumber++;
        this.totalTasksDisplay.text(this.tasksNumber);
    }

    initializeDefaultColumns() {
        let id;
        this.initialColumnsNames.forEach((column) => {
            id = column.toLowerCase().replace(" ", "-");
            this.main.append(`
                <section class="column" id=${id}></section>
            `);
            new Column(this.$("#"+id), column);
        });
        
        this.firstColumnTasks = this.$(".column").first().find(".task-list");
    }

    static init(selector = "body") {
        new App($(selector));
    }
}

export default App;