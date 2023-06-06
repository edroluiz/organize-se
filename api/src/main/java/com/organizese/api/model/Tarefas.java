package com.organizese.api.model;

import jakarta.persistence.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class Tarefas {
    @Id
    private String id;
    private String name;
    private boolean filled;

    public Tarefas() {
    }

    public String getId() {
        return this.id;
    }

    public String getName() {
        return this.name;
    }

    public boolean isFilled() {
        return this.filled;
    }

    public void setId(final String id) {
        this.id = id;
    }

    public void setName(final String name) {
        this.name = name;
    }

    public void setFilled(final boolean filled) {
        this.filled = filled;
    }

    public boolean equals(final Object o) {
        if (o == this) {
            return true;
        } else if (!(o instanceof Tarefas)) {
            return false;
        } else {
            Tarefas other = (Tarefas)o;
            if (!other.canEqual(this)) {
                return false;
            } else if (this.isFilled() != other.isFilled()) {
                return false;
            } else {
                Object this$id = this.getId();
                Object other$id = other.getId();
                if (this$id == null) {
                    if (other$id != null) {
                        return false;
                    }
                } else if (!this$id.equals(other$id)) {
                    return false;
                }

                Object this$name = this.getName();
                Object other$name = other.getName();
                if (this$name == null) {
                    if (other$name != null) {
                        return false;
                    }
                } else if (!this$name.equals(other$name)) {
                    return false;
                }

                return true;
            }
        }
    }

    protected boolean canEqual(final Object other) {
        return other instanceof Tarefas;
    }

    public int hashCode() {
        boolean PRIME = true;
        int result = 1;
        result = result * 59 + (this.isFilled() ? 79 : 97);
        Object $id = this.getId();
        result = result * 59 + ($id == null ? 43 : $id.hashCode());
        Object $name = this.getName();
        result = result * 59 + ($name == null ? 43 : $name.hashCode());
        return result;
    }

    public String toString() {
        String var10000 = this.getId();
        return "Tarefas(id=" + var10000 + ", name=" + this.getName() + ", filled=" + this.isFilled() + ")";
    }
}
